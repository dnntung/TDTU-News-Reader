let delay = n => {  
     n = n || 2000;
     return new Promise(done => {
       setTimeout(() => {
         done();
       }, n);
     });
   }

let readAPost = async (n, e) => {
     let url = $(e).attr("onclick").replace("openInNewTab('","").replace("')",'')
	console.log(`Post ${n}: ${url}`)

	if (url.includes("https://student.tdt.edu.vn/thong-bao/")){ 
		return console.log(`INVALID URL! Skipping...`)
	}
     
     let handle = window.open(url)
     handle.addEventListener('load', ()=> handle.close());
     while (!handle.closed){ 
          await delay(3000)
     }  
}

let loadNewPage = async (page) => {
	$(".pageloader4").fadeIn();
	
	reqData = `search_name=&search_des=&search_donvi=&search_theloai=&from_day=&to_day=&chk_chuaxem=1&page=${page}&__RequestVerificationToken=${$("input[name='__RequestVerificationToken']").val()}`

	let loadAjaxReq = await $.ajax({
		type: "POST",
		url: '/Thongbao/Filter_TintucList',
		data: reqData,
		success: (resData) => {

			$("#div_lstThongBao").html(resData);
			$(".pageloader4").fadeOut();
		}
	});
}

let start = parseInt($(".jplist-next").attr("data-id"))
const end = parseInt($(".jplist-last").attr("data-id"))

for (currentPage= start; currentPage<=end; currentPage++) {
	await loadNewPage(currentPage)

	console.log(`PAGE ${currentPage} LOADED SUCCESSFULLY!!! Found ${$(".link-detail").length} posts`)

	if ($(".link-detail").length > 0){ 
		console.log(`READING...`)
		let posts = []
	
     	$(".link-detail").each((index,e) => posts.push(e))

		for (i=0; i<posts.length; i++){ 
			await readAPost(i+1, posts[i])
		}
	}
}