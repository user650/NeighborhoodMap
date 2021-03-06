## NeighborhoodMap
P5 - Neighborhood Map Project
Scott Stubbs

## DESCRIPTION

...This neighborhood map is focused on Milton, GA which is located in the North Atlanta suburbs. A google map shows several points of interest in this location and a corresponding list of locations is shown to the left of the map.

...The list of locations can be filtered by entering in a partial location in the search bar.  Entering in a filter
causes both the list and corresponding icons to be filtered.  By default if the search bar is left empty all locations are displayed.

...When a point of interest is clicked either on the list or by the icon on the map an additional list of Wikipedia links are shown below the main list of locations.  

## HOW TO RUN
1. Download the full project from my github site
2. Double click the "index.html" file at the root of the project.
**OR**
1. Run directly from Git Hub Pages by [clicking here](http://user650.github.io/NeighborhoodMap/):

# RECENT UPDATES:
Since the original submission I have made the following changes 

## THIRD revision:
- moved the googlemap async call back to HTML and used onerror to display an error alert when the call us unsuccessful
- updated the JSDoc based on new version of the app.js.
- inserted the newer verson of JQuery

## SECOND revision:
- changed the Google map call to use asynchronous  via JQUERY.  I moved this call from the HTML to the app.js script and used the callback to launch the main call to initialize ko variables.
-  changed the Wikipedia search information to display on the screen based on the knockout framework instead of jquery markup.   This required adjustment / moving the function to the view model rather than a location object method. 
- Fixed a bug that was not clearing out the wiki information if a new filter is put in place that did not include the location that was used for the previous wiki search.
- Made corrections using jshint

## FIRST revision: 
- changed the structure of the java script to a more object oriented approach.  I created a constructor for the Location object and populated an observable array of locations which include markers and infoWindows.
- added events to the icons and infoWindows and used them to call methods within the Location object to handle the animation and display of the infoWindws.
- fixed the WikiPedia list so that it displays only the list item that is highlighted.
- pan the map the newly selected icon item now.
- added an error alert to the html that will pop up a message if the call to Google Maps does not work correctly.
- I am updating the wikipedia section with a clearing of the html each time now instead of the prepend.  I can change it to 
use the ko list like above but I liked the way I can control the hyper links better with this method.
- I added a call back and onerror to the google call inside the HTML.  The async was not coorperating with me, my code would bomb out becasue the Google call did not come back in time. I did read a lot about this and how to use typeof in the javascript to check to see if the call was done. 
-- The animation stops when the icon’s associated infoWindow is closed now.
-- I close out the current infoWindows before opening a new infoWindow. 
-- I clear out the WikiPedia info planel before displaying new comments.
-- I installed JSDoc, changed my comment format and uploaded the documentation it produced to the JS folder.
-- I added more information to this readme including how to run the program.  I also looked at the [Udacity markdown documentation](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#headers)

# TECHNOLOGY USED:
I used, Jquery, Bootstrap and Knockout as part of this assignment.  The use of bootstrap allows the screen to dynamically 
scale based on the window size.  Knockout allows for the immediate auto-update of the View based on the user clicks. 
Jquery allowed for easy access to the Wikipeda via Ajax  

# RESOURCES:
The Udacity course front end web development and forums for this lesson were used
For inspiration, at the beginning of my coding I referenced this project on GITHUB :  https://github.com/sheryllun/Project5-NeighborhoodMap.
