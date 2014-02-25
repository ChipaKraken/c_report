c_report
========

AUCA Crime Report Project.
Bishkek, Kyrgysztan, 2014
-------------------------

**Overview:*
---------
CrimeReport website project is aimed to give users an ability to report illegal, insulting or illegitimate actions whether they are done toward them or if they became a witness.

**Functional Requirements:*
-----------------------
1)	Main page layout divided into two interactive sections – map and news feed.

2)	Interactive map module should be the main element in interface for observing the criminal situation and submitting the crime
-	User should be able to see crimes reported by other users all placed at once for the whole picture
-	User should be able to fully interact with map: zoom, zoom out, navigate, and mark a place for a new report (by clicking on map).

3)	News feed module should be placed left to the map module and should be automatically updated with last and/or important reports.
-	Every news should have time and place.
-	Every news should be an active element and be clickable to view the report pop-up page.
-	The user should be able to sort news by time or category.
-	Whenever the news is hovered the corresponding crime mark on map is highlighted.

4)	Submit button/section/module. Submit button should be placed above the news feed.
-	By clicking submit button the pop-up submit module should appear.
-	The module should have next fields: time, place, type of crime, description.
-	After the user submits the crime the crime should be automatically added to the database and shown on the map.
-	Each submitter should be given a unique link to access his entry.

5)	Crime page. This page show the particular crime submitted, can be accessed by unique link or from the news feed
-	The crime page should be a pop-up with crime description, time, place and comment section.
-	All users should be able to comment the report anonymously.
-	All users should be able to vote “up” or “down” for each crime entry on the crime page.

6)	Search box is a search module.
-	Search should implemented by keywords typed by user.
-	Search module should be live – the result should instantly appear in news feed field on the main page.
7)	Search engine optimization (SEO)
-	Gist implementation.

**Feature list:*
--------------

*News Feed module:*
-----------------
•	Sorting news
•	Real time search
•	Mapping by category
*Submit module:*
-----------------
•	Choose date from dropdown calendar
*Map module:*
--------------
•	Adjustable time period
•	Mapping by category
•	Zoom-in
•	Zoom-out
*News Pop Up:*
-------------
•	Comment
•	Rate
•	Report similar crime right from Pop Up



**User stories:*
---------------
*As a user* 
--------------
- I would like to report a crime so that I can report a crime that happened to me
- I would like to search/sort news so that I can find a crime that is interesting for me
- I would like to read news so that I can read what happened recently
- I would like to comment news so that I can add some information about the crime
- I would like to interact with map so that I can see where crimes happened
- I would like to rate news or comment so that I can highlight what I liked

*As a moderator* 
--------------
- I would like to be able to delete comments or news so that I can delete spam from website

*As a site administrator* 
---------------
- I would like to dump information from map module so that I can make statics later


**Not doing list:*
----------------
- Log in module
- Separate page for news feed/map/submit form 

**Labor division:*
----------------
*2/26/14*
**Zufar & Ilia:* DB design, DB implementation, back end
--------------------------------------------------------
**Chyngyz:* map module
--------------------------
**Timur:* submit form implementation 
--------------------------------------
**Halil:* search implementation, tags
---------------------------------------
