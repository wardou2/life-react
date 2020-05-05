/** Returns true if two arrays are identical. Credit to
 * https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
 */
export const arraysEqual = (a: any[], b: any[]): boolean => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};
