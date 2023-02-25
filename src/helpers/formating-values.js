export const removingSpaces = (value) => value.split(' ').join('')

export const addingSpaces = (value) => {
    value = String(value)
    value = removingSpaces(value)
    let reversedValues = value.split('').reverse()
    reversedValues.length > 3 && reversedValues.splice(3, 0, ' ')
    reversedValues.length > 7 && reversedValues.splice(7, 0, ' ')
    reversedValues.length > 11 && reversedValues.splice(11, 0, ' ')
    reversedValues.length > 15 && reversedValues.splice(15, 0, ' ')
    value = reversedValues.reverse().join('')
    return value
}
