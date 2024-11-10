from profile import Profile


class User:
    '''
    Authentication information for a user.

    Attributes:
        name: username of user
        email: email of user
    '''
    def __init__(self, name, email):
        self.name = name
        self.email = email
        self.profile = Profile(name)

    def __str__(self):
        return f'{self.name} <{self.email}>'
