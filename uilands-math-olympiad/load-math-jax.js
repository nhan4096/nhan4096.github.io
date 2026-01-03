MathJax = {
    loader: {load: ['input/asciimath', 'output/chtml']},
    output: {font: 'mathjax-newcm'},
    asciimath: {
        delimiters: [['$$','$$'], ['$','$']]
    },
    startup: {
        ready() {
            const {AsciiMath} = MathJax._.input.asciimath_ts;
            Object.assign(AsciiMath.prototype, {
                _compile: AsciiMath.prototype.compile,
                compile(math, document) {
                    math.display = (math.start?.delim === '$$' && math.end?.delim === '$$');
                    const result = this._compile(math, document);
                    const mstyle = result.childNodes[0].childNodes.pop();
                    mstyle.childNodes.forEach(child => result.appendChild(child));
                    if (math.display) {
                        result.attributes.set('display', 'block');
                    }
                    return result;
                }
            });
            MathJax.startup.defaultReady();
        }
    }
};