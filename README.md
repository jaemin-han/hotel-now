# Hotel Now

#Summary
The app finds affordable hotels near airports based on Airport IATA code and check-in & check-out dates.

# Use Case
- New users need to first sign up with a username and password to access this app.
- Existing users can simply log in to search afforable airport hotels based on their search queries.

From the profile page, a user can enter an airport IATA code (already provided a list of airport IATA codes as a modal) and select check-in and check-out dates to search for available hotels near an airport at lowest available rate. After reviewing hotel names, addresses, hotel rates, and other prominent information, a user then clicks save button which the hotel data are transferred to the favorites page for a final price comparison. 

#Approach & Setup
1. Use Node Fetch
2. Set up MVC Structure
3. Set up Service (Amadeus Travel Innovation Sandbox API)
4. Set up Routes (Controllers)
5. Make the Models
6. Utilize a database (MongoDB)
7. Style based on Wireframes

#Wireframe

Register/Log In
![](/public/image/login.png)

Sign Up
![](/public/image/signup.png)

User Log In
![](/public/image/userlogin.png)

User Profile/Hotel Search 
![](/public/image/profile.png)

Hotel Lists
![](/public/image/new.png)

User's Favorite Hotels
![](/public/image/new1.png)

#Technologies Used
- API: https://sandbox.amadeus.com/travel-innovation-sandbox/apis/get/hotels/search-airport
- Node
- Express
- Javascript
- HTML/CSS
- EJS
- Heroku
- MongoDB

#Hurdles
1. Setting up my files in MVC while connecting my API
2. Implementing user login authentication in my project
3. Emphasizing userflow throughout my project
