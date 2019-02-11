const formatDate = (schema, date) => {
  let final = schema,
    counter = 0;

  /* Initialize date */
  date = typeof date !== "undefined" ? new Date(date) : new Date();

  if (date.toString() === "Invalid Date") {
    throw new Error("Incorrect date formatting");
  }

  const matches = {
    m: {
      regex: /\[m\]/gim,
      val: date => new Date(date).getMonth() + 1,
    },
    mm: {
      regex: /\[mm\]/gim,
      val: date => {
        const m = (new Date(date).getMonth() + 1).toString();
        return m.length > 1 ? m : "0" + m;
      },
    },
    mth: {
      regex: /\[mth\]/gim,
      val: date => {
        let months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return months[new Date(date).getMonth()];
      },
    },
    month: {
      regex: /\[month\]/gim,
      val: date => {
        let months = [
          "January",
          "Februry",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return months[new Date(date).getMonth()];
      },
    },
    d: {
      regex: /\[d\]/gim,
      val: date => new Date(date).getDate(),
    },
    dd: {
      regex: /\[dd\]/gim,
      val: date => {
        const d = new Date(date).getDate().toString();
        return d.length > 1 ? d : "0" + d;
      },
    },
    date: {
      regex: /\[date\]/gim,
      val: date => {
        const d = new Date(date).getDate();
        switch (d) {
          case 1:
            return d + "st";
          case 2:
            return d + "nd";
          case 3:
            return d + "rd";
          default:
            return d + "th";
        }
      },
    },
    yy: {
      regex: /\[yy\]/gim,
      val: date =>
        new Date(date)
          .getFullYear()
          .toString()
          .slice(-2),
    },
    yyyy: {
      regex: /\[yyyy\]/gim,
      val: date => new Date(date).getFullYear(),
    },
    h: {
      regex: /\[h\]/gim,
      val: date => {
        const h = new Date(date).getHours();
        return h > 12 ? h - 12 : h;
      },
    },
    hh: {
      regex: /\[hh\]/gim,
      val: date => {
        const h = new Date(date).getHours();
        let hrs = h > 12 ? h - 12 : h;
        return hrs.toString().length > 1 ? hrs : "0" + hrs;
      },
    },
    h24: {
      regex: /\[h24\]/gim,
      val: date => new Date(date).getHours(),
    },
    hh24: {
      regex: /\[hh24\]/gim,
      val: date => {
        const h = new Date(date).getHours();
        return h.toString().length > 1 ? h : "0" + h;
      },
    },
    mn: {
      regex: /\[mn\]/gim,
      val: date => {
        const m = new Date(date).getMinutes();
        return m.toString().length > 1 ? m : "0" + m;
      },
    },
    s: {
      regex: /\[s\]/gim,
      val: date => new Date(date).getSeconds(),
    },
    ss: {
      regex: /\[ss\]/gim,
      val: date => {
        const s = new Date(date).getSeconds();
        return s.toString().length > 1 ? s : "0" + s;
      },
    },
    ampm: {
      regex: /\[ampm\]/gm,
      val: date => {
        return new Date(date).getHours() > 12 ? "pm" : "am";
      },
    },
    AMPM: {
      regex: /\[AMPM\]/gm,
      val: date => {
        return new Date(date).getHours() > 12 ? "PM" : "AM";
      },
    },
  };

  /* Loop through 'matches' object and check date schema for regex matches */

  for (let m in matches) {
    (function(m) {
      if (matches[m].regex.test(final)) {
        counter++;
        final = final.replace(matches[m].regex, matches[m].val(date));
      }
    })(m);
  }

  /* Throw error if no regex matches */
  if (!counter) {
    throw new Error("Please fix matches");
  }

  /* Return formatted date with backslashes removed */

  const brackRegex = /(\\\[)|(\\\])/gim;
  return final.replace(brackRegex, (m, p1, p2) =>
    m.replace(p1, "[").replace(p2, "]")
  );
};

export default formatDate;
