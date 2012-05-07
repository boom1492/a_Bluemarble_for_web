var mHost = "boom1492.iptime.org";
var junction = {};
var UUID = null;

function init(){    
    
    UUID = randomUUID_lite();
    var QR_src = "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl="+"http://"+mHost+"/pcsync?sessionId="+UUID;
    var str = "<img src='"+QR_src+"'>";
    str += "<br/> <h1>ID : " + UUID + "</h1>";
    $('.qrcode').html(str);
        
    var mHeight = document.body.clientHeight;
    var mWidth = document.body.clientWidth;
    var Field_table_list = $('#boardtable td:not(.dummy)');
     // 필드 크기 초기화
    Field_table_list.css('width',mWidth/10);
    Field_table_list.css('height',(mHeight-40)/11);

    Field_list[0] = new Field("출발");
    Field_list[0].td = Field_table_list.eq(0);

    Field_list[1] = new Field("중국 타이페이");
    Field_list[1].td = Field_table_list.eq(1);
    Field_list[1].value = 180000;
    Field_list[1].toll_default = 20000;
    Field_list[1].toll_villa = 40000;
    Field_list[1].toll_building = 80000;
    Field_list[1].toll_hotel = 150000;
    Field_list[1].price_villa = 35000;
    Field_list[1].price_building = 70000;
    Field_list[1].price_hotel = 150000;
    
    Field_list[2] = new Field("황금열쇠");
    Field_list[2].td = Field_table_list.eq(2);

    Field_list[3] = new Field("홍콩");
    Field_list[3].td = Field_table_list.eq(3);
    Field_list[3].value = 300000;
    Field_list[3].toll_default = 50000;
    Field_list[3].toll_villa = 80000;
    Field_list[3].toll_building = 100000;
    Field_list[3].toll_hotel = 200000;
    Field_list[3].price_villa = 60000;
    Field_list[3].price_building = 90000;
    Field_list[3].price_hotel = 190000;

    Field_list[4] = new Field("필리핀 마닐라");
    Field_list[4].td = Field_table_list.eq(4);
    Field_list[4].value = 120000;
    Field_list[4].toll_default = 15000;
    Field_list[4].toll_villa = 30000;
    Field_list[4].toll_building = 60000;
    Field_list[4].toll_hotel = 90000;
    Field_list[4].price_villa = 29000;
    Field_list[4].price_building = 55000;
    Field_list[4].price_hotel = 80000;
    
    
    Field_list[5] = new Field("대한민국 제주도");
    Field_list[5].td = Field_table_list.eq(5);
    Field_list[5].value = 500000;
    Field_list[5].toll_default = 150000;

    Field_list[6] = new Field("싱가포르");
    Field_list[6].td = Field_table_list.eq(6);
    Field_list[6].value = 220000;
    Field_list[6].toll_default = 30000;
    Field_list[6].toll_villa = 40000;
    Field_list[6].toll_building = 80000;
    Field_list[6].toll_hotel = 240000;
    Field_list[6].price_villa = 35000;
    Field_list[6].price_building = 70000;
    Field_list[6].price_hotel = 230000;
    

    Field_list[7] = new Field("황금열쇠");
    Field_list[7].td = Field_table_list.eq(7);

    Field_list[8] = new Field("이집트 카이로");
    Field_list[8].td = Field_table_list.eq(8);
    Field_list[8].value = 80000;
    Field_list[8].toll_default = 20000;
    Field_list[8].toll_villa = 90000;
    Field_list[8].toll_building = 130000;
    Field_list[8].toll_hotel = 200000;
    Field_list[8].price_villa = 80000;
    Field_list[8].price_building = 110000;
    Field_list[8].price_hotel = 180000;
    
    Field_list[9] = new Field("터키 이스탄불");
    Field_list[9].td = Field_table_list.eq(9);
    Field_list[9].value = 300000;
    Field_list[9].toll_default = 60000;
    Field_list[9].toll_villa = 100000;
    Field_list[9].toll_building = 180000;
    Field_list[9].toll_hotel = 250000;
    Field_list[9].price_villa = 90000;
    Field_list[9].price_building = 160000;
    Field_list[9].price_hotel = 230000;
    
    Field_list[10] = new Field("무인도");
    Field_list[10].td = Field_table_list.eq(10);

    Field_list[11] = new Field("그리스 아테네");
    Field_list[11].td = Field_table_list.eq(12);
    Field_list[11].value = 120000;
    Field_list[11].toll_default = 50000;
    Field_list[11].toll_villa = 20000;
    Field_list[11].toll_building = 40000;
    Field_list[11].toll_hotel = 80000;
    Field_list[11].price_villa = 2000;
    Field_list[11].price_building = 40000;
    Field_list[11].price_hotel = 80000;
    
    Field_list[12] = new Field("황금열쇠");
    Field_list[12].td = Field_table_list.eq(14);

    Field_list[13] = new Field("덴마크 코펜하겐");
    Field_list[13].td = Field_table_list.eq(16);
    Field_list[13].value = 270000;
    Field_list[13].toll_default = 100000;
    Field_list[13].toll_villa = 50000;
    Field_list[13].toll_building = 130000;
    Field_list[13].toll_hotel = 240000;
    Field_list[13].price_villa = 4000;
    Field_list[13].price_building = 110000;
    Field_list[13].price_hotel = 220000;
    
    Field_list[14] = new Field("스웨덴 스톡홀름");
    Field_list[14].td = Field_table_list.eq(18);
    Field_list[14].value = 340000;
    Field_list[14].toll_default = 90000;
    Field_list[14].toll_villa = 40000;
    Field_list[14].toll_building = 150000;
    Field_list[14].toll_hotel = 300000;
    Field_list[14].price_villa = 80000;
    Field_list[14].price_building = 150000;
    Field_list[14].price_hotel = 310000;
    
    Field_list[15] = new Field("콩코드 여객기");
    Field_list[15].td = Field_table_list.eq(20);
    Field_list[15].toll_default = 50000;
    Field_list[15].value = 150000;
    

    Field_list[16] = new Field("스위스 취리히");
    Field_list[16].td = Field_table_list.eq(22);
    Field_list[16].value = 310000;
    Field_list[16].toll_default = 70000;
    Field_list[16].toll_villa = 70000;
    Field_list[16].toll_building = 120000;
    Field_list[16].toll_hotel = 200000;
    Field_list[16].price_villa = 60000;
    Field_list[16].price_building = 120000;
    Field_list[16].price_hotel = 220000;
    

    Field_list[17] = new Field("황금열쇠");
    Field_list[17].td = Field_table_list.eq(24);

    Field_list[18] = new Field("독일 베를린");
    Field_list[18].td = Field_table_list.eq(26);
    Field_list[18].value = 400000;
    Field_list[18].toll_default = 100000;
    Field_list[18].toll_villa = 100000;
    Field_list[18].toll_building = 200000;
    Field_list[18].toll_hotel = 300000;
    Field_list[18].price_villa = 80000;
    Field_list[18].price_building = 190000;
    Field_list[18].price_hotel = 300000;
    

    Field_list[19] = new Field("캐나다 몬트리올");
    Field_list[19].td = Field_table_list.eq(28);
    Field_list[19].value = 200000;
    Field_list[19].toll_default = 80000;
    Field_list[19].toll_villa = 30000;
    Field_list[19].toll_building = 100000;
    Field_list[19].toll_hotel = 180000;
    Field_list[19].price_villa = 28000;
    Field_list[19].price_building = 95000;
    Field_list[19].price_hotel = 178000;
    

    Field_list[20] = new Field("사회복지기금 접수처");
    Field_list[20].td = Field_table_list.eq(39);

    Field_list[21] = new Field("아르헨티나 부에노스아이레스");
    Field_list[21].td = Field_table_list.eq(38);
    Field_list[21].value = 100000;
    Field_list[21].toll_default = 40000;
    Field_list[21].toll_villa = 20000;
    Field_list[21].toll_building = 80000;
    Field_list[21].toll_hotel = 130000;
    Field_list[21].price_villa = 20000;
    Field_list[21].price_building = 80000;
    Field_list[21].price_hotel = 140000;
    

    Field_list[22] = new Field("황금열쇠");
    Field_list[22].td = Field_table_list.eq(37);

    Field_list[23] = new Field("브라질 상파울루");
    Field_list[23].td = Field_table_list.eq(36);
    Field_list[23].value = 250000;
    Field_list[23].toll_default = 50000;
    Field_list[23].toll_villa = 40000;
    Field_list[23].toll_building = 100000;
    Field_list[23].toll_hotel = 200000;
    Field_list[23].price_villa = 35000;
    Field_list[23].price_building = 100000;
    Field_list[23].price_hotel = 210000;
    

    Field_list[24] = new Field("오스트레일리아 시드니");
    Field_list[24].td = Field_table_list.eq(35);
    Field_list[24].value = 130000;
    Field_list[24].toll_default = 44000;
    Field_list[24].toll_villa = 45000;
    Field_list[24].toll_building = 95000;
    Field_list[24].toll_hotel = 120000;
    Field_list[24].price_villa = 40000;
    Field_list[24].price_building = 90000;
    Field_list[24].price_hotel = 120000;
    

    Field_list[25] = new Field("대한민국 부산");
    Field_list[25].td = Field_table_list.eq(34);
    Field_list[25].toll_default = 200000;
    Field_list[25].value = 700000;
    
    Field_list[26] = new Field("미국 하와이");
    Field_list[26].td = Field_table_list.eq(33);
    Field_list[26].value = 500000;
    Field_list[26].toll_default = 100000;
    Field_list[26].toll_villa = 100000;
    Field_list[26].toll_building = 200000;
    Field_list[26].toll_hotel = 400000;
    Field_list[26].price_villa = 90000;
    Field_list[26].price_building = 200000;
    Field_list[26].price_hotel = 380000;
    

    Field_list[27] = new Field("포르투갈 리스본");
    Field_list[27].td = Field_table_list.eq(32);
    Field_list[27].value = 120000;
    Field_list[27].toll_default = 50000;
    Field_list[27].toll_villa = 40000;
    Field_list[27].toll_building = 130000;
    Field_list[27].toll_hotel = 230000;
    Field_list[27].price_villa = 30000;
    Field_list[27].price_building = 120000;
    Field_list[27].price_hotel = 230000;
    

    Field_list[28] = new Field("퀸 엘리자베스호");
    Field_list[28].td = Field_table_list.eq(31);
    Field_list[28].toll_default = 100000;
    Field_list[28].value = 300000;
    
    
    Field_list[29] = new Field("스페인 마드리드");
    Field_list[29].td = Field_table_list.eq(30);
    Field_list[29].value = 90000;
    Field_list[29].toll_default = 20000;
    Field_list[29].toll_villa = 50000;
    Field_list[29].toll_building = 70000;
    Field_list[29].toll_hotel = 120000;
    Field_list[29].price_villa = 50000;
    Field_list[29].price_building = 70000;
    Field_list[29].price_hotel = 130000;
    

    Field_list[30] = new Field("우주여행");
    Field_list[30].td = Field_table_list.eq(29);

    Field_list[31] = new Field("일본 도쿄");
    Field_list[31].td = Field_table_list.eq(27);
    Field_list[31].value = 180000;
    Field_list[31].toll_default = 50000;
    Field_list[31].toll_villa = 100000;
    Field_list[31].toll_building = 150000;
    Field_list[31].toll_hotel = 300000;
    Field_list[31].price_villa = 70000;
    Field_list[31].price_building = 130000;
    Field_list[31].price_hotel = 280000;
    

    Field_list[32] = new Field("컬럼비아 호");
    Field_list[32].td = Field_table_list.eq(25);
    Field_list[32].toll_default = 150000;
    Field_list[32].value = 300000;
    
    Field_list[33] = new Field("프랑스 파리");
    Field_list[33].td = Field_table_list.eq(23);
    Field_list[33].value = 280000;
    Field_list[33].toll_default = 100000;
    Field_list[33].toll_villa = 90000;
    Field_list[33].toll_building = 200000;
    Field_list[33].toll_hotel = 350000;
    Field_list[33].price_villa = 95000;
    Field_list[33].price_building = 210000;
    Field_list[33].price_hotel = 380000;
    

    Field_list[34] = new Field("이탈리아 로마");
    Field_list[34].td = Field_table_list.eq(21);
    Field_list[34].value = 80000;
    Field_list[34].toll_default = 30000;
    Field_list[34].toll_villa = 50000;
    Field_list[34].toll_building = 90000;
    Field_list[34].toll_hotel = 170000;
    Field_list[34].price_villa = 45000;
    Field_list[34].price_building = 90000;
    Field_list[34].price_hotel = 180000;
    

    Field_list[35] = new Field("황금열쇠");
    Field_list[35].td = Field_table_list.eq(19);

    Field_list[36] = new Field("영국 런던");
    Field_list[36].td = Field_table_list.eq(17);
    Field_list[36].value = 340000;
    Field_list[36].toll_default = 150000;
    Field_list[36].toll_villa = 90000;
    Field_list[36].toll_building = 250000;
    Field_list[36].toll_hotel = 400000;
    Field_list[36].price_villa = 8000;
    Field_list[36].price_building = 230000;
    Field_list[36].price_hotel = 350000;
    

    Field_list[37] = new Field("미국 뉴욕");
    Field_list[37].td = Field_table_list.eq(15);
    Field_list[37].value = 150000;
    Field_list[37].toll_default = 120000;
    Field_list[37].toll_villa = 40000;
    Field_list[37].toll_building = 100000;
    Field_list[37].toll_hotel = 320000;
    Field_list[37].price_villa = 4000;
    Field_list[37].price_building = 110000;
    Field_list[37].price_hotel = 330000;
    

    Field_list[38] = new Field("사회복지기금 내는 곳");
    Field_list[38].td = Field_table_list.eq(13);

    Field_list[39] = new Field("대한민국 서울");
    Field_list[39].td = Field_table_list.eq(11);
    Field_list[39].toll_default = 300000;
    Field_list[39].value = 1000000;
    
    for(i=0;i<Field_list.length;i++){
        var str = "<div class='Field'><div class='f_top'></div>"
                    +"<div class='f_body'>"
                    +"<div class='f_body_name'>"
                    +Field_list[i].name
                    +"</div>"
                    +"</div>";
            
        switch(i){
            case 0:
            case 2:
            case 7:
            case 10:
            case 12:
            case 15:
            case 17:
            case 20:
            case 22:
            case 30:
            case 35:
            case 38:
            case 5:
            case 25:
            case 39:
            case 28:
            case 32:    Field_list[i].available = 0; break;
            default: str += "<div class='f_bottom'>"+
                "<span class='f_bottom_1'>●</span>"+
                "<span class='f_bottom_2'>●</span>"+
                "<span class='f_bottom_3'>●</span>"+
                "</div>";
                break;
        }
        str += "</div>";
        Field_list[i].td.html(str);
    }    
    $('.f_bottom_1').css('height', (mHeight-40)/33);
    $('.f_bottom_2').css('height', (mHeight-40)/33);
    $('.f_bottom_3').css('height', (mHeight-40)/33);
    
    $('.f_bottom_1').css('opacity', '0.1');
    $('.f_bottom_2').css('opacity', '0.1');
    $('.f_bottom_3').css('opacity', '0.1');
    
    $('#initPage').show();
    $('#body').hide();
    
    for(i=0;i<4;i++){
        $('#init_player'+i).hide();
        $('#ready_player'+i).hide();
        $('#stat_player'+i).hide();
    }
}
