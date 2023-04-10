Project Title: Combining Data from Multiple APIs with Async and Lodash

Project Description:

In this project, you will be working with three different APIs provided by JSONPlaceholder, which contain data about users, posts, and comments. Your task is to fetch data from all three APIs asynchronously, use Lodash to combine the data into a single object, and save the combined data to a JSON file using the fs module.

The main objective of this project is to implement asynchronous programming and Lodash techniques to optimize the performance of data processing tasks when working with multiple APIs.

Project Requirements:

1.  Data Collection: Use the JSONPlaceholder APIs to collect data about users, posts, and comments.

2.  Data Processing: Use Lodash to combine the data from the three APIs into a single object. Implement asynchronous programming techniques using the Async/Await syntax in JavaScript to optimize the performance of these tasks.

3.  Save the Processed Data: Save the combined data to a JSON file using fs.

4.  Performance Optimization: Optimize the performance of the data processing tasks by using techniques such as chunking and parallel processing.

Project Tasks:

1.  Use the axios  library to fetch data from the JSONPlaceholder users, posts, and comments APIs.
   API url: Users:  https://jsonplaceholder.typicode.com/users
   API Posts: https://jsonplaceholder.typicode.com/posts
   APi Comments: https://jsonplaceholder.typicode.com/comments

1.  Use Async.js to fetch data from all three APIs simultaneously and combine the data into a single object.

3.  Use Lodash to perform any necessary data transformations or manipulations to create the final object.

4.  Use fs to save the processed data to a JSON file.

5.  Optimize the performance of the data processing tasks using techniques such as chunking or parallel processing.

6.  Create Functions in each step of the process. Everything should be async.

Example Output:

After running the program, the console should output a message indicating that the combined data has been saved to a JSON file. The saved file should include the combined data in a format similar to the following:

{
	user_one:{
		...,
		posts:[{..., comments:[...] }, {..., comments:[...]}],
	},
	user_two:{
		...,
		posts:[{..., comments:[...] }, {..., comments:[...]}],
	},
}