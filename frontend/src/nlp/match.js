function allocate_points(points){
    const totalPoints = 10
    const nonZeroValues = points.filter(x => x !== 0)

    let result
    
    if (nonZeroValues.length > 0) {
        // Calculate the sum of the non-zero values
        const totalNonZero = nonZeroValues.reduce((sum, x) => sum + x, 0)

        // Allocate points proportionally
        result = points.map(x => 
            x !== 0 ? Math.round((x / totalNonZero) * totalPoints * 100) / 100 : 0
        )
    } else {
        result = points // If no non-zero values, return the array as is
    }

    return result
}
export default allocate_points