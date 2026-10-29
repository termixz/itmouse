var nums = [1,2,34,21,23,2,1,34];
let counter = 0;
for (let num of nums){
    counter += num;
}
alert(counter);
let max = nums.sort(function(a, b){
    return b - a;
})[0];
alert(max);
let min = nums.sort(function(a, b){
    return a - b;
})[0];
alert(min);
nums = [1,2,34,21,23,2,1,34];
let nums1 = [];
for (i = nums.length - 1;i >= 0;i--){
    nums1.push(nums[i]) 
}
alert(nums1);
nums = [1,2,34,21,23,2,1,34];
let nums2 = [];
var isTrue = false;
for (i = 0;i < nums.length;i++){ 
    for (k = nums.length;k > i;k--){
        if(nums[i] != nums[k]){
            var isTrue = true;
        }else{
            var isTrue = false;
            break;
        }
}
    if(isTrue){
        nums2.push(nums[i]);
    }else{
        continue;
    }
}
alert(nums2)
nums = [1,2,34,21,23,2,1,34];
let nums3 = [];
for (i = nums.length -1;i > 0;i--){ 
    nums3.push(nums[i])
}
alert(nums3)
var nums = [1,2,34,21,23,2,1,34];
let nums4 = nums.filter(function(a){
    return a % 2 == 0;
});
alert(nums4)
let nums5 = nums.sort(function(a, b){
    return a - b;
});
alert(nums5);
nums = [1,2,34,21,23,2,1,34];
let nums6 = [12,43,541,123];
for(i = nums.length -1;i > 0;i--){
    nums6.push(nums[i])
}
alert(nums6);
nums = [1,2,34,21,23,2,1,34];
let num = 34;
let index = -1;
for(i = nums.length -1;i > 0;i--){
    if(34 == nums[i]){
        index = i;
    }
}
alert(index);
nums = [1,2,3,4,5];
let nums7 = nums.map(function(a){
    return a * 2;
})
alert(nums7);
