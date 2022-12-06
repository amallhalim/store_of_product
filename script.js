// recall tht input
let title = document.querySelector("#title") ;
let price = document.querySelector("#price") ;
let taxes = document.querySelector("#taxes"); 
let ads = document.querySelector("#ads"); 
let discount = document.querySelector("#discount"); 
let total = document.querySelector("#total"); 
let count = document.querySelector("#count"); 
let catagory = document.querySelector("#catagory"); 
let submit = document.querySelector("#submit"); 

let mood= "create"
// to make submit button two rules create and update
let tmp;

// function===== get total -----------------------------------------------------
/* we must convert string to number 
/beacause all input even of allow user to enter number
and the final result is "string " at all so to make any mathmatical opearation
you should convert it to number first
*/
function get_total() {
    if (price.value != "") {
        let result =  (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML= result
        total.style.background="green"
    }else{
        total.innerHTML =""
        total.style.background="red"
    }
}
console.log(localStorage)

// where save data ==> best place is localStorage
// عيبها انها اول لماتعمل تحميل لصفحه هتحذف  البيانات
// recall the variable name not as array
let pro_array ;
// Array are useful to save all data but remove alldata when reload 
//   check if product which i create in localstorage are emety or not
if (localStorage.product != null) {
    // you must convert data to array beacause i convert by stritify to string
    // if local storage are not empty save all data in array      
    pro_array=JSON.parse(localStorage.product);
    // console.log(product)
}else{
    pro_array=[];
    // console.log(product)
} 

// function===== create new product  --------------------------------------------
// tell to computer to work this function when you click submit button-----------
submit.onclick=function() { 
    // create object of all properties of product=="newproduct"
    let newproduct = { 
        // title:>>>>> is releated to object properties name
        title:title.value.toLowerCase(),
        taxes:taxes.value.toLowerCase(),
        price:price.value.toLowerCase(),
        ads:ads.value.toLowerCase(),
        discount:discount.value.toLowerCase(),
        total:total.innerHTML.toLowerCase() ,/*important*/
        // we use Inner HTML >>>because its not an input filed so cant use  ".value"
        count:count.value.toLowerCase(),
        catagory:catagory.value.toLowerCase()
    } 


    // add new product at the end of the array
// function===== save data in localStorage========================
// check the validation of the count--
// function===== create a lot of item by click
if (title.value!="" && price.value!="" && catagory.value!="" && count.value < 100) {

if (mood ==="create"){
    if (newproduct.count > 1) {
        for (let index = 0; index < newproduct.count; index++) {
            // to create new item by number in count
            pro_array.push(newproduct)
        }     
    } else {
        pro_array.push(newproduct) 
    }
// if are in update mode=====
}else{
    // we use tmp to acess the item you choice to update it
    pro_array[tmp] = newproduct
    // after finishing update return to create mode
    mood = "create"
    submit.innerHTML = "create"
    // because we make count disappear we must reappear it
    count.style.display = "block";
    }

    cleardata()

}
    // pro_array.push
    //to create element in localStorage 

    localStorage.setItem("product",JSON.stringify(pro_array))

    // local storage must include only a string
    // recall the data after finishing
    show_data( )
}


// function===== clean data input when create finishing create anew product
// function===== clear data after input
function cleardata() {
    title.value = " ";
    title.value = " ";
    taxes.value = " ";
    price.value = " ";
    ads.value = " ";
    discount.value = " ";
    total.innerHTML = " "; /* we use innerhtml not .value == beacuse that is not an input field*/ 
    count.value =" ";
    catagory.value = " ";
}


// function===== read=========================================================
function show_data() {
    let table = " ";  
    for ( let index = 0; index < pro_array.length; index++)
    {
        // ####### table += pro_array[index]  #######
        // if add array directly to html it make a problem 
        // beacause it became object inside object so must add as Html code
        // 
        table += 
        ` <tr>
            <td> ${index + 1} </td>
            <td> ${pro_array[index].title} </td>
            <td> ${pro_array[index].price} </td>
            <td> ${pro_array[index].taxes} </td>
            <td> ${pro_array[index].ads} </td>
            <td> ${pro_array[index].discount} </td>
            <td> ${pro_array[index].total} </td>
            <td> ${pro_array[index].catagory} </td>
            <td><button onclick="update_product(${index})" id="update">update</button></td>
            <td><button onclick="delete_product(${index})" id="delete">delete</button></td>
        </tr> `
    }

    document.getElementById("body").innerHTML= table;
    
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4
    let deleteAll=document.querySelector("#deleteAll");
    if (pro_array.length >0) 
    {
        deleteAll.innerHTML=`<button onclick="deleteAll()">delete All (${pro_array.length})</button>`;
    }else{
        deleteAll.innerHTML=` `;
    } 
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    
    get_total()
    // to make total func work

}
show_data()
// we make to copy of that function to 
// be work at all time=============^^^^^^^^^^^^^^^^^^^^


// function===== delete data only one product  ===============================
function delete_product(i) {
    // to delete data only one product
    // i is the begin of delete
    pro_array.splice(i,1);

    //that thing delete item only in array
    // so you need to update your localstorage  
    // yoy must stritify==>>array to be string to localstorage 
    localStorage.product=JSON.stringify(pro_array);
    show_data();
    // we make to copy of that function to be work at all time==^^^^^^^
    // so if you delete any item you can see change directly 
}

// function===== deleate all ================================================
function deleteAll () {
    // my data are in two places array and localstorage
    // delete localstorage
    localStorage.clear();
    // delete array
    pro_array.splice(0);

// show data function take data from array 
// and array save data in localstorage
    show_data();
    // we make to copy of that function to be work at all time==^^^^^^^

}

// function===== update=====================================================
function update_product(i) {
// console.log(i)
title.value = pro_array[i].title
price.value = pro_array[i].price
taxes.value= pro_array[i].taxes
ads.value = pro_array[i].ads
discount.value = pro_array[i].discount
total.innerHTML = total[i]
count.value = pro_array[i].count
catagory.value = pro_array[i].catagory
// to make the total work with new data
get_total()

count.style.display = "none";
// because we are in update mode-----
submit.innerHTML = "UPDATE ";
mood = "update ";

tmp = i; 
// we declare tmp outsize the function
// its a global variable

scroll( {top:0, behavior:"smooth"})
// to make screen in top part to update data easy
}


// function===== search========================================================
// 1 search by title mood
let search_mood="title"
function get_search_mood(id) {
    let search=document.getElementById("search");

// search_by_category
if (id=="search_by_title") {
    search_mood="title"
    // console.log(search_mood)
} else {
    // 1 search by category mood
    search_mood="category"
    // console.log(search_mood)
}
search.placeholder = "search by " + search_mood
// that appear as a placeholder in box 

// if you click of any btn has this func ---it make focus in input field
// to facilate to user
search.focus();
// if click in button clear old data
search.value=""
show_data()
}  


// search function--------------=================================================
function search(value) {
    let table=" ";
    // we need to looping in all product in array
    for (let index = 0; index < pro_array.length; index++) {
        
        // search by category
        if (search_mood =="title") {
            // include is agood way to compare value
            // if found matched value
            if( pro_array[index].title.includes(value.toLowerCase())){
                // we need to make anew table of reasult
                table += 
                `<tr>
                <td> ${index} </td>
                <td> ${pro_array[index].title} </td>
                <td> ${pro_array[index].price} </td>
                <td> ${pro_array[index].taxes} </td>
                <td> ${pro_array[index].ads} </td>
                <td> ${pro_array[index].discount} </td>
                <td> ${pro_array[index].total} </td>
                <td> ${pro_array[index].catagory} </td>
                <td><button onclick="update_product(${index})" id="update">update</button></td>
                <td><button onclick="delete_product(${index})" id="delete">delete</button></td>
                </tr>   `
            }  
    }else{
        // search by category
            if( pro_array[index].catagory.includes(value.toLowerCase())){
            table += `
            <tr>
                <td> ${index} </td>
                <td> ${pro_array[index].title} </td>
                <td> ${pro_array[index].price} </td>
                <td> ${pro_array[index].taxes} </td>
                <td> ${pro_array[index].ads} </td>
                <td> ${pro_array[index].discount} </td>
                <td> ${pro_array[index].total} </td>
                <td> ${pro_array[index].catagory} </td>
                <td><button onclick="update_product(${index})" id="update">update</button></td>
                <td><button onclick="delete_product(${index})" id="delete">delete</button></td>
            </tr> `
        }
    }
    }
    // to add table to body
    document.getElementById("body").innerHTML= table;

}