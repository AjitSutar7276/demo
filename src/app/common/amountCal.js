function convert(number) {

    if (number < 0) {

        console.log("Number Must be greater than zero = " + number);
        return "";
    }
    if (number > 100000000000000000000) {
        console.log("Number is out of range = " + number);
        return "";
    }
    if (!is_numeric(number)) {
        console.log("Not a number = " + number);
        return "";
    }

    var quintillion = Math.floor(number / 1000000000000000000); /* quintillion */
    number -= quintillion * 1000000000000000000;
    var quar = Math.floor(number / 1000000000000000); /* quadrillion */
    number -= quar * 1000000000000000;
    var trin = Math.floor(number / 1000000000000); /* trillion */
    number -= trin * 1000000000000;
    var Gn = Math.floor(number / 1000000000); /* billion */
    number -= Gn * 1000000000;
    var million = Math.floor(number / 1000000); /* million */
    number -= million * 1000000;
    var Hn = Math.floor(number / 1000); /* thousand */
    number -= Hn * 1000;
    var Dn = Math.floor(number / 100); /* Tens (deca) */
    number = number % 100; /* Ones */
    var tn = Math.floor(number / 10);
    var one = Math.floor(number % 10);
    var res = "";

    if (quintillion > 0) {
        res += (convert_number(quintillion) + " quintillion");
    }
    if (quar > 0) {
        res += (convert_number(quar) + " quadrillion");
    }
    if (trin > 0) {
        res += (convert_number(trin) + " trillion");
    }
    if (Gn > 0) {
        res += (convert_number(Gn) + " billion");
    }
    if (million > 0) {
        res += (((res == "") ? "" : " ") + convert_number(million) + " million");
    }
    if (Hn > 0) {
        res += (((res == "") ? "" : " ") + convert_number(Hn) + " Thousand");
    }

    if (Dn) {
        res += (((res == "") ? "" : " ") + convert_number(Dn) + " hundred");
    }


    var ones = Array("", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eightteen", "Nineteen");
    var tens = Array("", "", "Twenty", "Thirty", "Fourty", "Fifty", "Sixty", "Seventy", "Eigthy", "Ninety");

    if (tn > 0 || one > 0) {
        if (!(res == "")) {
            res += " and ";
        }
        if (tn < 2) {
            res += ones[tn * 10 + one];
        } else {

            res += tens[tn];
            if (one > 0) {
                res += ("-" + ones[one]);
            }
        }
    }

    if (res == "") {
        console.log("Empty = " + number);
        res = "";
    }
    alert(res);
    console.log(res);
    return res;
}
function is_numeric(mixed_var) {
    return (typeof mixed_var === 'number' || typeof mixed_var === 'string') && mixed_var !== '' && !isNaN(mixed_var);
}