const generateBtn=document.getElementById("generateBtn");
const startNum=document.getElementById("startNum");
const endNum=document.getElementById("endNum");
const userName=document.getElementById("userName");
const algoId=document.getElementById("algoId");
const result=document.getElementById("result");

const algorithms={
    1:"Bruteforce",
    2:"Naive",
    3:"Sieve_of_eratosthenes"
}

generateBtn.onclick= async (e)=>{

    const user={
        start_range:+startNum.value.trim(),
        end_range:+endNum.value.trim(),
        algo_id:+algoId.value,
        user_name:userName.value.trim()
    }

    if(user.start_range==0||user.end_range==0||user.algo_id==0||user.user_name==""){
     alert("All fields are required!");
     return;
    }
    if(user.start_range>=user.end_range){
       alert("Starting number can never be greater than ending range!");
       return;
    }
    if(user.start_range<1||user.end_range<1){
        alert("Only values greater than 1 are allowed!");
        return;
    }
    const res=await fetch(`http://localhost:3000/primeAlgo`,{
        method:"POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        body: JSON.stringify(user)
    });
    let data =await res.json();
    data=data.data;
    console.log(data);
    result.innerHTML=`
    <div>Username: ${data.user.user_name}</div>
    <div>Starting range: ${data.user.start_range}</div>
    <div>Ending range: ${data.user.end_range}</div>
    <div>Total primes: ${data.user.total_primes}</div>
    <div>Algorithm used: ${algorithms[data.user.algo_id]}</div>
    <div>Time Elapsed: ${data.user.time_elapsed} ms</div>
    <div>Time stamp: ${data.user.time_stamp}</div>
    <div>Result: ${data.result}</div>
    `;
}

