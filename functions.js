import User from "./user.model.js";

//Iterative Approach
const algo1 = (start, end) => {
    const arr = [];
    for (let i = start; i <= end; i++) {
        if (checkPrime1(i)) arr.push(i);
    }
    return arr;
}

const checkPrime1 = (i) => {
    if (i <= 1) return false;
    if (i <= 3) return true;
    if (i % 2 == 0 || i % 3 == 0) return false;
    for (let j = 5; j <= Math.sqrt(i); j++) {
        if (i % j == 0) return false;
    }
    return true;
}

//Recursive Approach
const algo2 = (start, end) => {
    const arr = [];
    let j = 5;
    for (let i = start; i <= end; i++) {
        if (checkPrime2(i, j)) arr.push(i);
    }
    return arr;
}

const checkPrime2 = (i, j) => {
    if (i <= 1) return false;
    if (i == j) return true;
    if (i <= 3) return true;
    if (i % 2 == 0 || i % 3 == 0) return false;
    if (i % j == 0) return false;
    j++;
    return checkPrime2(i, j);
}

//Sieve of Eratosthenes Approach
const algo3 = (start, end) => {
    const arr = [];
    const arr2 = [];
    for (let i = start; i <= end; i++) {
        arr2[i] = true;
    }
    for (let i = start; i <= end; i++) {
        if (arr2[i]) {
            const val = checkPrime1(i);
            arr2[i] = val;
            if (arr2[i]) {
                for (let j = i * i; j <= end; j += i) {
                    arr2[j] = false;
                }
            }
        }
    }
    for (let i = start; i <= end; i++) {
        if (arr2[i]) {
            arr.push(i);
        }
    }
    return arr;
}

const controller=async (req, res) => {

    const user_name=req.body.user_name;
    const start_range = req.body.start_range;
    const end_range = req.body.end_range;
    const algo_id=req.body.algo_id;
    if(!user_name||!start_range||!end_range||!algo_id){
      return res.status(403).send({
        status:403,
        message:"Invalid input format!"
      })
      
    }
    if(start_range<1 || end_range<1){
      return res.status(403).send({
        status:403,
        message:"Only values greater than 1 are allowed!"
      })
    }
    if(start_range>=end_range){
      return res.status(403).send({
        status:403,
        message:"Starting number can never be greater than ending range!"
      })
    }
    let result;

    const startTime=Date.now();

    switch(algo_id){
      case 1:
        result=algo1(start_range,end_range);
        break;
      case 2:
        result=algo2(start_range,end_range);
        break;
      case 3:
        result=algo3(start_range,end_range);
        break;
    }
    const endTime=Date.now();
    const time_elapsed=endTime-startTime;
    const total_primes=result.length;
    try {
      let user=new User({
        user_name,
        algo_id,
        start_range,
        end_range,
        total_primes,
        time_elapsed
      })
      user=await user.save();
      res.status(200).send({
        status:200,
        data:{user,result},
        message:"Successfully calculated primes."
      })
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status:500,
        message:"Error occurred while calculating prime."
      })
    }
  }

export default controller;