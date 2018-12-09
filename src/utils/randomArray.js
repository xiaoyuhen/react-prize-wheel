const randomArray = number => {
  let i = 0
  let index = 0
  let temp = null
  let arr = [length]
  const length = 41
  for(i = 1; i <= length; i++) {
      arr[i - 1] = i
  }
  for(i = 1; i <= length; i++) {
      index = window.parseInt(Math.random() * (length - i)) + i
      if (index != i) {
      temp = arr[i - 1]
      arr[i - 1] = arr[index - 1]
      arr[index - 1] = temp
      }
  }
  return arr.splice(0, number)
}

export default randomArray
