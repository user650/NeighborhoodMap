# NeighborhoodMap
P5 - Neighborhood Map Project
Scott Stubbs

# DECRIPTION:

This neighborhood map is focused on Milton, GA whcih is located in the North Atlanta suburbs. A googlemap shows
Several points of interest in this location and a corresponding list of locations is shown to the left of the map.

The list of locations can be filtered by entering in a partial location in the searchbar.  Entering in a filter
causes both the list and corresponding icons to be filtered.  By default if the searchbar is left empty all locations
are displayed.

When a point of interest is clicked either on the list or by the icon on the map an additional list of Wikipedia
links are shown below the main list of loactions.  

# HOW TO RUN

** To run : **
1. Download the full project from my github site
2. Double click the "index.html" file at the root of the project.

** OR **

1. Run directly from Git Hub Pages by [clicking here](http://user650.github.io/NeighborhoodMap/):

# RECENT UPDATES:

** Since the original submission I have made the following changes ** 

1. I changed the structure of the java script to a more object oriented approach.  I created a constructor for the Location object
and populated an observable array of locations which include markers and infoWindows.

2. I added events to the icons and infoWindows that call methods attached to the Locations to handle the animation and display 
of the infoWindws.

3. I fixed the wikiPedia list so that it displays only the list item that is highligted.

4. I pan to the currently selected item now.

5. I added an error alert to the html that will pop up a message if the call to google does not work correctly.

## ITEMS FIXED FROM THE CODE REVIEW

- I changed it to the object oriented approach suggested.
- I am updating the wikipedia section with a clearing of the html each time now instead of the prepend.  I can change it to 
use the ko list like above but I liked the way I can control the hyper links better with this method.
- I added a call back and onerror to the google call inside the HTML.  The async was not coorperating with me, my code would bomb out becasue the Google call did not come back in time. I did read a lot about this and how to use typeof in the javascript to check to see if the call was done. 
-  
-  

-- I stopped the animation when the infoWindow is closed now.
-- I close out the infoWindows when click to a new list item or icon.
-- I clear out the wikiPedia info planel before displaying new comments.
-- I installed JSDoc, changed my comment format and uploaded the documentaion it prodcued to the JS folder.
-- I added more information to this readme including how to run the program.  I also looked at the [Udacity markdown documentation](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#headers)


# TECHNOLOGY USED:

I used, Jquery, Bootstrap and Knockout as part of this assignment.  The use of bootstrap allows the screen to dynamically 
scale based on the window size.  Knockout allows for the immediate auto-update of the View based on the user clicks. 
Jquery allowed for easy access to the Wikipeda via Ajax  

# RESOURCES:

The Udacity course front end web development and forums for this lesson were used
For inspiration I referenced this project on GITHUB :  https://github.com/sheryllun/Project5-NeighborhoodMap
pop in and

 I loaded marker data in there data 
1) I'm sure there is a better way to update the list after the filter.  The trick I used is to completly clear out the 
list and repopuate it after the fileter.  It seems that the Knockout did not realize I changed the MarkerList observable
array unless I did this.

2) The map also would not populate unless I forced it into a particular height.  If I left the height open it would show up
blank.

3) Given more time I could also figure out how clear out the list of Wikipedia links after each click.  As a workaround I 
used the prepend instead of the append to populate the list.

4) I could have also included more API calls to other services.  

