

class Profile:

    '''
constructor for user class: user is a class to contain information on specific users

Attributes
string name = username for user
string email = email of userstring password
int skill1 = confidence/comfort from 1-9 in specific skill
int skill2 = confidence/comfort from 1-9 in specific skill 
int outcome = how good do you want final product to be? 1-9

#Figure out epoch for calender date
!!!!! datetime workingSchedule = what times is the user availible
'''

    def __init__(self, name: str, skill1: int, skill2:):
        self.name = name
        self.skill1 = None
        self.skill2 = None
        self.outcome = None
        self.availibility = None
# Read/Write
#name
    def update_name(self, new_name):
        self.name = new_name
    def get_name(self):
        return self.name
#skill1
    def update_skill1(self, new_skill1):
        self.skill1 = new_skill1
        
    def get_skill1(self):
        return self.skill1

#skill2
    def update_skill2(self, new_skill2):
        self.skill2 = new_skill2

    def get_skill3(self):
        return self.skill2
    
#outcome
    def update_outcome(self, new_outcome):
        self.outcome = new_outcome

    def get_outcome(self):
        return self.outcome

#availibility
    def update_availibility(self, new_availibility):
        self.availibility = new_availibility

    def get_availibility(self):
        return self.availibility
    