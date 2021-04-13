# TDTU-News-Reader
A simple script reading all posts on TDTU Student News automatically

## Cách sử dụng
- Mở trình duyệt lên và tạo một bookmark mới bằng cách ấn chuột phải trên thanh bookmark => **"Add page..."**
- Nhập ***tên*** tùy ý và copy paste cái đống bên dưới vào ***URL***

```
javascript:(async function(){let delay = n => %7B  %0D%0A     n = n %7C%7C 2000;%0D%0A     return new Promise(done => %7B%0D%0A       setTimeout(() => %7B%0D%0A         done();%0D%0A       %7D, n);%0D%0A     %7D);%0D%0A   %7D%0D%0A%0D%0Alet readAPost = async (n, e) => %7B%0D%0A     let url = $(e).attr("onclick").replace("openInNewTab('","").replace("')",'')%0D%0A%09console.log(%60Post $%7Bn%7D: $%7Burl%7D%60)%0D%0A%0D%0A%09if (url.includes("https://student.tdt.edu.vn/thong-bao/"))%7B %0D%0A%09%09return console.log(%60INVALID URL! Skipping...%60)%0D%0A%09%7D%0D%0A     %0D%0A     let handle = window.open(url)%0D%0A     handle.addEventListener('load', ()=> handle.close());%0D%0A     while (!handle.closed)%7B %0D%0A          await delay(3000)%0D%0A     %7D  %0D%0A%7D%0D%0A%0D%0Alet loadNewPage = async (page) => %7B%0D%0A%09$(".pageloader4").fadeIn();%0D%0A%09%0D%0A%09reqData = %60search_name=&search_des=&search_donvi=&search_theloai=&from_day=&to_day=&chk_chuaxem=1&page=$%7Bpage%7D&__RequestVerificationToken=$%7B$("input%5Bname='__RequestVerificationToken'%5D").val()%7D%60%0D%0A%0D%0A%09let loadAjaxReq = await $.ajax(%7B%0D%0A%09%09type: "POST",%0D%0A%09%09url: '/Thongbao/Filter_TintucList',%0D%0A%09%09data: reqData,%0D%0A%09%09success: (resData) => %7B%0D%0A%0D%0A%09%09%09$("#div_lstThongBao").html(resData);%0D%0A%09%09%09$(".pageloader4").fadeOut();%0D%0A%09%09%7D%0D%0A%09%7D);%0D%0A%7D%0D%0A%0D%0Alet start = parseInt($(".jplist-next").attr("data-id"))%0D%0Aconst end = parseInt($(".jplist-last").attr("data-id"))%0D%0A%0D%0Afor (currentPage= start; currentPage<=end; currentPage++) %7B%0D%0A%09await loadNewPage(currentPage)%0D%0A%0D%0A%09console.log(%60PAGE $%7BcurrentPage%7D LOADED SUCCESSFULLY!!! Found $%7B$(".link-detail").length%7D posts%60)%0D%0A%0D%0A%09if ($(".link-detail").length > 0)%7B %0D%0A%09%09console.log(%60READING...%60)%0D%0A%09%09let posts = %5B%5D%0D%0A%09%0D%0A     %09$(".link-detail").each((index,e) => posts.push(e))%0D%0A%0D%0A%09%09for (i=0; i<posts.length; i++)%7B %0D%0A%09%09%09await readAPost(i+1, posts%5Bi%5D)%0D%0A%09%09%7D%0D%0A%09%7D%0D%0A%7D})()
```

- Đăng nhập vào hệ thống thông tin sinh viên và vào trang thông báo của trường: https://studentnews.tdtu.edu.vn/Thongbao
- Click vào bookmark vừa tạo ban nãy và tận hưởng 🍔

## Một số lưu ý nhỏ
**KHÔNG ĐƯỢC ĐỤNG ĐẾN CỬA SỔ ĐANG THỰC THI SCRIPT**

***Việc chạy script khá nhẹ nhàng, nên cứ thoải mái thực hiện các tác vụ khác***

**Nếu muốn dừng script, chỉ cần tắt cửa sổ đang thực thi là xong**
