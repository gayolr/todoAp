# Creating a Todo List App

For this frontend challenge, we’d like you to implement a Todo App in **Angular** that allows users to create, edit and manage a Todo list.

---

## High-level Requirements
As a user, I can:
- Read a list of Tasks
- Add a Task
- Delete a Task
- Edit a Task
- Mark a Task as completed
- View the following subset of Tasks: All Tasks, Active Tasks, Completed Tasks

## Implementation Requirements
- App must conform to Angular 16 (i.e. no standalone components, no signals etc...).
    - You are free to use the latest Angular version available however, refrain from using new features mentioned above.
- TODO items should be fetched from an API.
    - External API: https://dummyjson.com/docs/todos
    - Note:
        - You'll need to hit the following URL to fetch an initial set of Tasks: https://dummyjson.com/todos
        - The endpoint will default to a limit of ~30 tasks in various states. Please render them accordingly.
            - You do not need to fetch more tasks. 
- Use Material UI to style your app: https://material.angular.io
    - Your app should look similar to the Mockup below.

### Bonus Points
- Implement unit tests to test app flow and actions.

## Helpful Resourcees
- Angular Starter Guide: https://angular.io/tutorial/first-app

## Mockup
<img src="TodoAppMockup.png" alt="drawing" width="450"/>
