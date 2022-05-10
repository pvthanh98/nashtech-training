// /**
//  * 
//  * This file is for testing online
//  * 
//  */
// import { JobTitle } from './constants/job-title.constant';
// import ITEmployee from './interfaces/it-engineer';
// import MobileSellerEmployee from './interfaces/mobile-seller';
// import HumanUtil from './utils/human.util';

// const iter = new ITEmployee("Thanh Phan", 24, "tp HCM", "SD4988");
// const seller = new MobileSellerEmployee("Phuong Yen",23, "tp HCM","SD222");


// const humanUtil = new HumanUtil(iter);
// const humanUtil2 = new HumanUtil(seller);


// console.log(humanUtil.generateNickName())
// console.log(humanUtil2.generateNickName())


// for (const [key, value] of Object.entries(JobTitle)){
//     console.log(`${key} - ${value}`)
// }

function hello (...names: any) {
    console.log(names)
}

var a = ["123","1233333"]

hello(...a)