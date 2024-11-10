import itertools
import numpy as np
from scipy.optimize import linear_sum_assignment

class ProjectMatch:
    """
    custom class designed to hold collection of users assigned to a project, allow for the sorting of these users into groups, and storing those teams
    """
    def __init__(self):
        self.ProfileAll = []
        self.compatible = []
        self.compatibility_matrix = None
        self.names = []
    
    def add_profile(self, profileArg):
        """
        add_profile adds a profile to the project instance
        """
        self.ProfileAll.append(profileArg)
        
    def remove_profile(self, profileArg):
        """
        remove_profile removes a profile from the project instance if it exists
        """
        if profileArg in self.ProfileAll:
            self.ProfileAll.remove(profileArg)
        
    def compatibility(self):
        """
        calculates the compatability of every user with every other user, then displays a compatibility matrix
        """
        weights = np.array([0.1, 0.5, 0.3])
        n_profiles = len(self.ProfileAll)
        self.compatible = []
        
        # Get all pairs of profiles
        pairs = list(itertools.permutations(self.ProfileAll, 2))
        
        # Calculate differences and weighted scores for each pair
        for a, b in pairs:
            diff = np.abs(a.stats - b.stats)
            weighted_score = np.dot(diff, weights)
            
            self.compatible.append({
                'profile1': a.name,
                'profile2': b.name,
                'differences': diff,
                'weighted_score': weighted_score
            })
        
        # Create compatibility matrix
        self.compatibility_matrix = np.zeros((n_profiles, n_profiles))
        self.names = [p.name for p in self.ProfileAll]
        
        for result in self.compatible:
            i = self.names.index(result['profile1'])
            j = self.names.index(result['profile2'])
            self.compatibility_matrix[i][j] = result['weighted_score']
        
        # Display the compatibility matrix
        print("\nCompatibility Matrix:")
        print("-" * (20 + 8 * n_profiles))
        
        # Print column headers
        print("        ", end="")
        for name in self.names:
            print(f"{name:>8}", end="")
        print("\n" + "-" * (20 + 8 * n_profiles))
        
        # Print matrix with row labels
        for i, name in enumerate(self.names):
            print(f"{name:>8}", end="")
            for j in range(n_profiles):
                print(f"{self.compatibility_matrix[i][j]:8.2f}", end="")
            print()
            
        return self.compatibility_matrix

    def find_optimal_pairs(self):
        """Find optimal pairings that minimize total compatibility differences"""
        if len(self.ProfileAll) % 2 != 0:
            print("\nWarning: Odd number of profiles. One profile will be unpaired.")
        
        # Get compatibility matrix if not already calculated
        if self.compatibility_matrix is None:
            self.compatibility()
        
        # Prepare matrix for Hungarian algorithm
        n = len(self.ProfileAll)
        cost_matrix = self.compatibility_matrix.copy()
        
        # Handle odd number of profiles by padding
        if n % 2 != 0:
            n += 1
            padding = np.zeros((1, cost_matrix.shape[1]))
            cost_matrix = np.vstack([cost_matrix, padding])
            padding = np.zeros((cost_matrix.shape[0], 1))
            cost_matrix = np.hstack([cost_matrix, padding])
        
        # Reshape matrix to handle pairwise assignments
        n_pairs = n // 2
        reshaped_matrix = np.zeros((n, n))
        
        # Fill reshaped matrix with costs of pairing combinations
        for i in range(n):
            for j in range(n):
                if i != j:
                    reshaped_matrix[i, j] = cost_matrix[i, j]
                else:
                    reshaped_matrix[i, j] = float('inf')  # Prevent self-pairing
        
        # Find optimal assignments
        row_ind, col_ind = linear_sum_assignment(reshaped_matrix)
        
        # Process and print results
        print("\nOptimal Pairings:")
        print("-" * 50)
        
        used_indices = set()
        total_compatibility_score = 0
        pair_counter = 1
        
        for i in range(len(row_ind)):
            row, col = row_ind[i], col_ind[i]
            
            # Skip if either index is already used or represents padding
            if row in used_indices or col in used_indices:
                continue
            if row >= len(self.names) or col >= len(self.names):
                continue
                
            score = self.compatibility_matrix[row, col]
            total_compatibility_score += score
            
            print(f"\nPair {pair_counter}:")
            print(f"  {self.names[row]} <-> {self.names[col]}")
            print(f"  Compatibility Score: {score:.2f}")
            
            used_indices.add(row)
            used_indices.add(col)
            pair_counter += 1
        
        # Check for unpaired profiles
        unpaired = set(range(len(self.names))) - used_indices
        if unpaired:
            print("\nUnpaired Profiles:")
            for idx in unpaired:
                print(f"  {self.names[idx]}")
        
        print(f"\nTotal Compatibility Score: {total_compatibility_score:.2f}")
        n_pairs = len(used_indices) // 2
        print(f"Average Pair Score: {total_compatibility_score/n_pairs:.2f}")

