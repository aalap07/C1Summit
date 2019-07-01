## Overview
This is a progressive web app created with ReactJS to help users gain access to NPS parks data all in one place.

## User interface
Upon navigating to the webpage, the user is greeted by a welcome message and the option to choose between name search and state/designation search, and this is controlled through a radio button toggle. If the user opts for name search, the search bar will prompt them to enter at least three characters. This is an important feature that guards against a bad API response, since there is a limit on how many requests can be made per hour. If the user is to enter one or two characters, these would be very vague queries, returning a very large number of results and causing the API's quota to be exhausted quickly. Additionally, this has been done with the assumption that, similar to any search engine, the user minimally has a general idea of what they are looking for. Upon entering the search and clicking on the button, the code will process this accordingly. If the user has entered something invalid, such as less than three characters, it will alert and stop right there so that the user may try again. If successful, the application will take the search that has been made by the user and append a unique identifier to the end. This will then be passed as the query to fetch the matching results. This unique identifier is a float value and its purpose is solely to make sure that no two searches are identical. This is particularly important in cases where the user makes a search and presses search again without making any changes. If the same query is repeated consecutively, the app will not refresh because the functions that are being called are called with each render, and if nothing has changed, there will be no re-rendering. Because of this property, we must add an identifier to the end to ensure that a refresh occurs even if the user enters the same search multiple times. 

In the event that the user selects state/designation search, the UI switches to two dropdowns and the user must select a state. If no designation is provided, it will use "Any" by default and load all results from the selected state. If a state is not selected, the user will be notified to do so. Upon selecting a state, the dropdown of designations will filter the data in real time to provide the user with designations that are available in that state. It is also significant to note that in the data set, there are a few US territories which have no matches, and so these have been omitted from the dropdown (Marshall Islands, Palau, etc). 

Given that the user has now entered a valid search and clicks on the button, the application will populate with a line that states what it is showing results for, as well as the matching parks beneath it represented in a "card" format. For each park, the structure is as follows:

·       Park name

·       Park designation

·       Left half: Appropriate matches from NPS Symbol Library with legend underneath and image of park from API

·       Right half: List of states that the park is in, Google Maps API container using longitude and latitude data from NPS API to show an interactive map to the user

·       Panel component with 4 sections: Overview, While You're There, Things to Know, Educational Information

Overview: Description, Entrance Fees, Park Code, Park ID

While You're There: Visitor Centers, Nearby Campgrounds, Events Information

Things to Know: Alerts, Articles, News

Educational Information: Lesson Plans, Places, Relevant People

## Programming Logic 
Each component of the panel uses conditional rendering, meaning that if an element is empty, it will not show it at all, saving time and space for the user. The one exception I have made to this is for alerts, since it is important to notify a user that there are no alerts, and all is clear for that park. Otherwise, for example, if there is no data provided from the API regarding lesson plans, that section will not be rendered that panel will skip straight to places and relevant people. By doing this, I believe I have made the interface very intuitive and efficient. Additionally, for news and articles, each title is also a hyperlink to view the full news piece or article respectively, allowing for the user to simply click the link if they are interested. 

Following the parks section, the final component is the show more button at the bottom, which will add two more park cards for each click and also display how many remaining matches there are. This feature is also one I deem a necessity due to limitations of API requests. During the testing phase, an issue I dealt with heavily was that of vague queries, and for the name search, the logical approach was to simply request 3+ characters from the user, as even Google, Yahoo, Bing, etc require some initial entry. For states, however, there are some states with a very large number of matches, such as New York, with 37 entries.  If the user is to select "Any" designation, the page would populate with 37 parks, something which is both inefficient and unsafe in terms of the API. We do not want the application to stop functioning mid-user request due to a bad API response. For this reason, I am loading only two parks at a time, and if the user is interested in more, they can continually load two more until all matching parks have been loaded. By doing this, not only is the application saving the user an immense amount of loading time, but it is also taking into account that the average user would not be likely to scroll through all 37 parks in this case, as well as the observation that one park card takes up quite a large portion of the window.

## Good to know
Important information regarding error catching: Each park object in this application makes 10 requests to the API. NPS API caps requests at 1000 per hour, meaning that users will be able to load up to 100 parks per hour. I have implemented an error catching feature which will detect if the API sends back a bad response code for each park render and will notify the user with an alert and immediately reload the page to prevent any memory issues. If this is to happen during testing, please contact me and I will be able to change the API key in the code to allow for further testing. 

## Screenshots
![b0e4ada0e318-Things+to+Know](https://user-images.githubusercontent.com/23727170/60465241-a43e2980-9c1e-11e9-86c6-9e29b5c494b5.png)
![b0e4ada0e318-Platforms](https://user-images.githubusercontent.com/23727170/60465243-a4d6c000-9c1e-11e9-997f-cd0f2875d4be.png)
![b0e4ada0e318-Canyon+example](https://user-images.githubusercontent.com/23727170/60465244-a56f5680-9c1e-11e9-9be0-d29f604b5fa6.png)
![b0e4ada0e318-iPhone](https://user-images.githubusercontent.com/23727170/60465249-a6a08380-9c1e-11e9-914e-1ddb8cc176c6.png)
