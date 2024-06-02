Project Description:
Question:
Develop a web page that displays a form with two language
tabs (English and Arabic). Each tab should have a repeatable
input control block set containing fields for Name, Email, and
Phone. The user should be able to add and remove these
control block sets from the form. All fields will be mandatory.
Settings : The page should also have a radio button that allows the user to enable &quot;Add &amp; delete Control Block
Set&quot; between &quot;Only English&quot; and &quot;English &amp; Arabic&quot; options.

Functionality Expected:
Case1: If the &quot;Only English&quot; option is selected, the &quot;Add New&quot; &amp; &quot;Remove Block Set&quot; button should only appear
in the English tab. However, when a new control block set is added, it should automatically create a
corresponding block set in the Arabic tab as well. When an English block set is removed, the corresponding
Arabic block set should also be removed.
Case2: If &quot;English &amp; Arabic&quot; option is selected, the tabs should behave independently, allowing the user to add
and remove control block set for each language.
Upon form submission, all the values from both language tabs should be sent to the controller.
Save To DB is optional.
Requirements:
1. Implement the web page using .NET Core &amp; Razor Pages.
2. Use JavaScript/jQuery to handle the dynamic addition and removal of control sets.
3. Ensure that all the block set fields are mandatory.
Evaluation Criteria:
1. Functional correctness: The web page should behave according to the specified requirements.
2. Code quality: The code should be well-structured, maintainable, and follow best practices.
3. User interface: The web page should use bootstrap CSS &amp; JS.

Project StartUp:
Clone the repository from Github: https://github.com/USAF1/boxon_project.git
The project follows .Net 6 MVC architecture.
To start the project build the project and run it on an IIS server.
To store data in Db do the following:
  Update the db connection string in \boxon_project\DataAccess\DBContext.cs
  Run the update-database command in the Nuget package manager console.
Run the project and the data would be stored in db.
Project Architecture: 
The project follows .Net 6 MVC Architecture. The presentation layer is the .Net Razor pages, while the controllers are responsible for redirecting, 
showing the corresponding views, and executing services based on the view's actions. 
The services are responsible for performing different core actions. In our case the ArticleService stores data into the db. 
The Models are responsible for mapping the accurate data onto view or accepting data from the view and storing it in the db.

We are following the Code first approach where db is built upon the models of .Net 6 
