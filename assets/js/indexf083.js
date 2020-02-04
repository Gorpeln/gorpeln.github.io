webpackJsonp([6], {
    8 : function(i, t, n) {
        function a(i, t, n) {
            var a = n || $.trim($("#" + i).html());
            if ((t = t || {}) instanceof Array) {
            	for (var e = 0; e < t.length; e++){
            		a += '<option value="' + t[e] + '">' + t[e] + "</option>"
            	};
            }
            else{ 
            	for (var e in t) {
            		a += '<option value="' + e + '">' + t[e].value + "</option>";
            	}
            }
        	$("#" + i).html(a)
        }
        function e(i, t, n, a, e, o, r) {

			var op_province=$("#province_list option:selected");  
			var op_city=$("#city_list option:selected");  
			var op_county=$("#county_list option:selected");  
			var addressNum ="";
			if (op_county.val()) {
				addressNum = op_county.val();
			}else{
				if (op_city.val()) {
					addressNum = op_city.val();
				}else{
					if (op_province.val()) {	
						addressNum = op_province.val();
					}else{
						addressNum = ""; 
					}
				}
			}

			var op_year=$("#year_list option:selected");  
			var op_month=$("#month_list option:selected");  
			var op_date=$("#date_list option:selected");  

            var l = "";
            return i || t || n || (l = addressNum || xei.getRandom(v)),
            a = op_year.val() ||  xei.getRandom(s),
            e = op_month.val() || xei.getRandom(u),
            o = op_date.val() || xei.getRandom(d),
            r = "man" == r ? xei.getRandom([1, 3, 5, 7, 9]) : "woman" == r ? xei.getRandom([2, 4, 6, 8, 0]) : xei.getRandom(10),
            l += a + e + o + xei.fixNumber(xei.getRandom(100), 2) + r,
            l += xei.getIdCardLastChar(l);

        }
        function o() {
            for (var i, t = parseInt($("#make_idcard_count").val()) || 100, n = "", a = 0; a < t; a++) i = e(),
            n += i + "：" + r(i) + "\n";
            $("#idcard_list").html(n)
        }
        function r(i) {
            var t = "";
            if (18 != i.length) t = "身份证长度必须是18位！";
            else {
                var n = xei.getIdCardLastChar(i);
                if (n != i[17]) t = "身份证不合法，校验码错误，正确校验码为：" + n;
                else {
                    var a = i.substring(16, 17) % 2 == 0 ? "女": "男";
                    var strBirthday = i.substring(6, 10)+"-"+i.substring(10, 12)+"-"+i.substring(12, 14);
                    t =  "出生日期：" + i.substring(6, 10) + "年" + i.substring(10, 12) + "月" + i.substring(12, 14) + "日，性别："+ a + "，年龄：" + PrefixInteger(jsGetAge(strBirthday),2) +"，籍贯：" + c[i.substring(0, 6)]
                }
            }
            return t
        }
        n(0);
        var l = cityUtil.getCityMap(all_city_codes),
        c = cityUtil.getAllCuntys(all_city_codes),
        s = [],
        u = [],
        d = [],
        v = []; !
        function() {
            for (var i = 1950; i < 2021; i++) s.push(i);
            for (var i = 1; i < 13; i++) u.push(xei.fixNumber(i, 2));
            for (var i = 1; i < 32; i++) d.push(xei.fixNumber(i, 2));
            for (var i in c) v.push(i);
            a("year_list", s),
            a("month_list", u),
            a("date_list", d)
        } (),
        function() {
            a("province_list", l, '<option value="">--省(随机)--</option>'),
            $("#province_list").on("change",
            function() {
                a("city_list", (l[this.value] || {}).children, '<option value="">--市(随机)--</option>');
            }),

            $("#city_list").on("change",
            function() {
                var i = this.value,
                t = {};
                i && (t = l[i.substring(0, 2) + "0000"].children[i].children),
                a("county_list", t, '<option value="">--县(随机)--</option>')
            })
        } (),
        $("#btn_validate").on("click",
        function() {
            var i = $("#input_idcard").val();
            $("#validate_result").html(r(i))
        }),
        $("#btn_random_idcard").on("click",
        function() {
            $("#input_idcard").val(e())
        }),
        $("#btn_batch_make_idcard").on("click", o),
        o()
    }
},
[8]);


function jsGetAge(strBirthday){
  var returnAge;
  // 根据生日计算年龄（"1995-09-25"）
  //以下五行是为了获取出生年月日，如果是从身份证上获取需要稍微改变一下
  var strBirthdayArr=strBirthday.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];

  d = new Date();
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1;
  var nowDay = d.getDate();

  if(nowYear == birthYear){
    returnAge = 0;//同年 则为0岁
  }
  else{
    var ageDiff = nowYear - birthYear ; //年之差
    if(ageDiff > 0){
      if(nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay;//日之差
        if(dayDiff < 0)
        {
          returnAge = ageDiff - 1;
        }
        else
        {
          returnAge = ageDiff ;
        }
      }
      else
      {
        var monthDiff = nowMonth - birthMonth;//月之差
        if(monthDiff < 0)
        {
          returnAge = ageDiff - 1;
        }
        else
        {
          returnAge = ageDiff ;
        }
      }
    }
    else
    {
      returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return returnAge;//返回周岁年龄

}

function PrefixInteger(num, length) {
  return (num/Math.pow(10,length)).toFixed(length).substr(2);
}

