const axios = require('axios')
const _ = require('lodash')
const async = require('async')
const fs = require('fs')

// let getUser = async function () { 
//     let data = await axios.get('https://jsonplaceholder.typicode.com/users')
//     // console.log(data.data)
// }
// getUser()

// let getPost = async function () { 
//     let data = await axios.get('https://jsonplaceholder.typicode.com/posts')
//     // console.log(data.data)
// }
// getPost()


// let getComments = async function () { 
//     let data = await axios.get('https://jsonplaceholder.typicode.com/comments')
//     // console.log(data.data)
// }
// getComments()


// var merge = _.unionBy(getUser, getPost, getComments, 'id');
// console.log(merge)

// async.auto({
//     get_user: async function () {
//         console.log('>>>>>>>> Get User')
//         let result = await axios.get('https://jsonplaceholder.typicode.com/users')
//         // for (let i = 0; i < result.data.length; i++) {
//             let get = _.map(result.data, 'id')
//             console.log(get)
//         // }
//     },

//     // get_post: async function () {
//     //     console.log('>>>>>>>> Get Post')
//     //     let result = await axios.get('https://jsonplaceholder.typicode.com/posts')
//     //     return result.data
//     // },

//     // get_comments: async function () {
//     //     console.log('>>>>>>>> Get Comments')
//     //     let result = await axios.get('https://jsonplaceholder.typicode.com/comments')
//     //     return result.data
//     // },

//     // getAllData : ['get_use', 'get_post', 'get_comments', async function(results){
//     //     results.get_user.forEach(element => {
//     //         return element
//     //     });
//     // }]
// },
//     function (err, results) {
//         if (err) {
//             throw err
//         }
//         let output = {
//             success: results.data,
//             failure: 0,
//             warning: 0
//         }
//         console.log('OUTPUT: ' + JSON.stringify(output))
//     }
// )



async.auto({
    get_user: function(callback) {
        axios.get('https://jsonplaceholder.typicode.com/users').then((res)=>{
            callback(null, res.data);
        }).catch((er)=>{
            callback(null,er)
        })
    },
    get_post: function(callback) {
        axios.get('https://jsonplaceholder.typicode.com/posts').then((res)=>{
            callback(null, res.data);
        }).catch((er)=>{
            callback(null,er)
        })
    },
    get_comment: function(callback) {
        axios.get('https://jsonplaceholder.typicode.com/comments').then((res)=>{
            callback(null, res.data);
        }).catch((er)=>{
            callback(null,er)
        })
    },
    write_file: ['get_user', 'get_post', 'get_comment', function(results, callback) {
        const merged = _.merge(_.keyBy(results.get_user, 'id') , _.keyBy(results.get_post, 'id'), _.keyBy(results.get_comment, 'id'))
        var values = _.values(merged)
        callback(null,values);
    }],
}, function(err, results) {
    if (err) {
        console.log('err = ', err);
    }
    fs.writeFileSync("file.json", JSON.stringify(results));
    console.log('get all data completed');
    // console.log('results = ', results);
});




// async.parallel([
//     function(callback) {
//        axios.get('https://jsonplaceholder.typicode.com/users').then((res)=>{
//            callback(null,res.data);
//        }).catch((er)=>{
//            callback(null, 'one',er)
//        })
//    },
//    function(callback) {
//        axios.get('https://jsonplaceholder.typicode.com/posts').then((res)=>{
//            // fs.writeFileSync("./data.json", JSON.stringify(res.data));
//            callback(null, 'one',JSON.stringify(res.data));
//        }).catch((er)=>{
//            callback(null, 'one',er)
//        })
//    },
//    function(callback) {
//        axios.get('https://jsonplaceholder.typicode.com/comments').then((res)=>{
//            callback(null, 'one',res.data);
//        }).catch((er)=>{
//            callback(null, 'one',er)
//        })
//    },
// ], function(err,results) {
//    console.log(err,results)
// });