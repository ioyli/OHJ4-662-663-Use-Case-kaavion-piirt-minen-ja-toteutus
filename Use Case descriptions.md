# Use Case descriptions

### Register

- User
- Pre-condition: User must not be already logged in
- Post-condition: Account created
- Basic path
    1. Display registration page on button click
    2. User sends desired account information on button click
    3. Read existing account information, if available, create new account
    4. User can now log in with their credentials

- Exceptional path
    1. If username and/or e-mail are already in use, interrupt and give an error message.


### Login

- User, Administrator
- Pre-condition: User/admin must not be already logged in
- Post-condition: Logged into account
- Basic path
    1. Display login page on button click
    2. User/admin sends login information on button click
    3. Read existing usernames
    4. Read password information of username
    5. Log in to account

- Exceptional path
    1. If username or password is incorrect, interrupt and give an error message.


### Browse polls

- User, Administrator
- Pre-condition: Polls must exist
- Basic path
    1. Display browse polls page on button click
    2. Limit to how many polls displayed at once, see second page on button click

- Exceptional path
    1. If there are no polls to display, display error message


### Vote on poll

- User
- Pre-condition: User must not have already voted on selected poll
- Post-condition: User's vote saved, display total votes to user
- Basic path
    1. Click on poll to display its full page
    2. Click on poll option to vote
    3. Save user's vote
    4. Display total votes

- Exceptional path
    1. If poll does not exist or has expired, interrupt and display error message


### See total votes

- User, Administrator
- Pre-condition: User must have voted on poll
- Basic path
    1. View poll page
    2. User must have voted on poll to see total vote count, admin sees total vote count on all polls

- Exceptional path
    1. If poll does not exist or has expired, interrupt and display error message


### Remove poll

- Admin
- Pre-condition: Poll has to exist
- Post-condition: Poll information deleted
- Basic path
    1. Click on poll to display its full page
    2. Remove poll on button click
    3. Display confirmation prompt
    4. If yes, proceed. If no, interrupt.
    5. Delete corresponding poll information

- Exceptional path
    1. If poll does not exist or has expired, interrupt and display error message


### Add poll

- Admin
- Post-condition: Poll added
- Basic path
    1. Display add poll page on button click
    2. Admin sends desired poll information on button click
    3. Read information and add poll

- Exceptional path
    1. If identical poll exists, interrupt and display error message