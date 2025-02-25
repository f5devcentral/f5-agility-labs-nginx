Update Template Submission
==========================

As Jane Developer, we are going to edit an application that was deployed using a Template

1. Click **Template Submissions** in the left navigation.

   Notice the **Templates** menu item exists, the developer role will need READ access to the Templates themselves in order to pull the latest submission.

2. Click on the **Basic Reverse Proxy** row. Details of the template submission appear.

3. At the right side of the **nginx.f5demos.com** row, there will be a `...` menu in the **Actions** column. Click that, then select **Edit Submission**.

   You should see the familiar template filled with values similar to what you saw earlier.

4. On the **HTTP Servers** view, click the edit icon on the **pygoat** row.

5. Change the *HTTP Server Inputs -> Listen -> Default Server* value to **FALSE**.

6. Click the **Next** button until you see the preview of the config generated from the templates. Note the diff view shows that the `default_server` is being removed from the listen directive.

7. Click the **Publish** button. If successful, you should see a message indicating so.

8. On the PyGoat FireFox tab, refresh the browser to ensure the application is still working.

You did it! What if Jane would like to control aspects of the configuration that have not been exposed in the base template? As you read about in the lab introduction, this this is where **Augment Templates** can be used.
