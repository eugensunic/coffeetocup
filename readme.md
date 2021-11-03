# CoffeeToCup

Web platform for coffee brewing statistics. User goes through 3 steps when preforming the process of coffee brewing. 
Each user has access to other user statistics showing their brewing parameters.

Likewise, each user has a detailed overview of all of his previous brewings.

Technical info: Calculating data based on brewing input parameters.

## Local installation 
1. go to **startcoffee-fe** and run ``npm run install`` then run ``npm run prod``
2. go to **startcoffee-generics** and run ``npm run install`` and then ``npm run prod``
3. go to **startcoffee-be**  and run ``npm run install`` and then ``npm run start``
4. open the application on [http://localhost:5000/](http://localhost:5000)

## Host and run on server (digital ocean)
[Bitbucket credentials](https://id.atlassian.com/login) where all the repos are: username, password (see eugen.sunic@mgail.com)

Use master branch only for new changes and app deployment

Make sure the droplet is turned ON. Inside the droplet click on access and login to the server using the 
__Console__.
The credentials are stored on eugen.sunic@gmail.com


**Run the app**:

first destroy all node instances: `killall node`
```javascript

rm -rf startcoffee-be && 
git clone https://eugensunic@bitbucket.org/eugensunic/startcoffee-be.git && 
cd startcoffee-be && 
npm install &&
npm run prod
```
it will ask for bitbucket credentials, (see eugen.sunic@gmail.com) and the app will start shortly after installing.

## DNS host 
https://www.namecheap.com/myaccount/login/?ReturnUrl=%2f 

## Sending mails with app
login with credentials (ask Marko Koprivnjak)
https://ap.www.namecheap.com/ProductList/EmailSubscriptions 

configuration inside code used to transfer mails

```
  let transport = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 587,
    secure: false,
    auth: {
      user: info@coffeetocup.com,
      pass: marko1510
    }
  });
```
Also, check `.env` file where the user and password are pulled out from.
## Projects languages/technologies used in the app: 
MongoDB, 
Node.js, 
Vanilla JS (JavaScript), 
Angular2+, 
HTML,
CSS, 
SCSS,
Bootstrap 4 

### Contact person (product owner)

Marko Koprivnjak 

**skype**: Marko Koprivnjak

**gmail**: marko.koprivnjak1@gmail.com

### Other

Refer to https://www.youtube.com/watch?v=oykl1Ih9pMg for setting up firewall, https, nginx and upload the app online among others.