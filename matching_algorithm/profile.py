

class Profile:

    '''
name = username for userstring 
email = email of userstring passwordint 
skill1 = confidence/comfort from 1-9 in specific skillint 
skill2 = confidence/comfort from 1-9 in specific skillint 
outcome = how good do you want final product to be?
!!!!! datetime workingSchedule = what times is the user availible

    constructor for user class: user is a class to contain information on specific users

Attributes:
    name: username of user
    bio: parragraph for expression

    
questions:
    skill1: confindence in skill 1
    skill2: confindence in skill 2
    effort: What kind of final product are you committed to producing?
    availibility: calender times (epoch?)

'''

    def __init__(self, name: str):
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
    