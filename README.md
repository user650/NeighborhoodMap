# NeighborhoodMap
P5 - Neighborhood Map Project
Scott Stubbs

DECRIPTION:

This neighborhood map is focused on Milton, GA whcih is located in the North Atlanta suburbs. A googlemap shows
Several points of interest in this location and a corresponding list of locations is shown to the left of the map.

The list of locations can be filtered by entering in a partial location in the searchbar.  Entering in a filter
causes both the list and corresponding icons to be filtered.  By default if the searchbar is left empty all locations
are displayed.

When a point of interest is clicked either on the list or by the icon on the map an additional list of Wikipedia
links are shown below the main list of loactions.  

TECHNOLOGY USED:

I used, Jquery, Bootstrap and Knockout as part of this assignment.  The use of bootstrap allows the screen to dynamically 
scale based on the window size.  Knockout allows for the immediate auto-update of the View based on the user clicks. 
Jquery allowed for easy access to the Wikipeda via Ajax  

RESOURCES:

The Udacity course front end web development and forums for this lesson were used
For inspiration I referenced this project on GITHUB :  https://github.com/sheryllun/Project5-NeighborhoodMap

TODO:

This project did take me much longer to complete than the first four projects.  As such, I am ending my work on this now
even though there are more enhancements I feel that could be made.

1) I'm sure there is a better way to update the list after the filter.  The trick I used is to completly clear out the 
list and repopuate it after the fileter.  It seems that the Knockout did not realize I changed the MarkerList observable
array unless I did this.

2) The map also would not populate unless I forced it into a particular height.  If I left the height open it would show up
blank.

3) Given more time I could also figure out how clear out the list of Wikipedia links after each click.  As a workaround I 
used the prepend instead of the append to populate the list.

4) I could have also included more API calls to other services.  

