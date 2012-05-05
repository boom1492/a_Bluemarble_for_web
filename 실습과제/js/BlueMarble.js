var Field_list = new Array(40);
// Field List Global Variable.
var Player_list = new Array(4);
var Player_color = new Array(4);
var Player_number = [0, 0, 0, 0];

var mTurnNumber = 0;
var mTurnState = 0;
var mFund = 0;
//�������
var STATE_TOLL = 0, STATE_BUYLAND = 1, STATE_BUILD = 2, STATE_GOLDENKEY = 3, STATE_ALONE = 4, STATE_SPACETRIP = 5, STATE_FUND = 6, STATE_RECVFUND = 7, STATE_DICE = 8, STATE_DOUBLE = 9;

function Field(name) {
    this.td = 0;
    this.name = name;
    this.villa = 0;
    this.building = 0;
    this.hotel = 0;
    this.price_villa = 0;
    this.price_builing = 0;
    this.price_hotel = 0;
    this.toll_villa = 0;
    this.toll_builing = 0;
    this.toll_hotel = 0;
    this.toll_default = 0;
    this.value = 0;
    this.owner = -1;
    this.available = 1;
}

function Player(number, IMEI) {
    this.number = number;
    this.location = 0;
    this.IMEI = IMEI;
    this.item = {};
    this.money = 0;
    this.playerName = "player" + this.number;
    this.countAlone = 0;
    this.ready = 0;
    
}

function test() {
    //test code
    joinPlayer("123", "����");
    joinPlayer("321", "��Ƽ��");
    movePlayer(0, 5);
    movePlayer(1, 3);
    movePlayer(1, 7);
    joinPlayer("3432", "���ӽ�");
    movePlayer(2, 1);
    joinPlayer("324", "������");
    movePlayer(3, 10);    
}

function joinPlayer(IMEI, name) {
    for( i = 0; i < 4; i++) {
        if(Player_number[i] == 0) {
            Player_list[i] = new Player(i, IMEI);
            Player_list[i].playerName = name;
            Player_number[i] = 1;
            Player_list[i].money = 2000000;
            $('#log').append("<br/>" + Player_list[i].playerName + " ����");
            $('.name_player'+i).html(Player_list[i].playerName);
            $('#init_player'+i).show();
            $('#stat_player'+i).show();
            redraw(i);
            return i;
        }
    }
    alert("Full.");
    return false;
}

function leavePlayer(number) {
    $('.name_player'+number).html("");
    $('#init_player'+number).hide();
    $('#stat_player'+number).hide();
    Field_list[Player_list[number].location].td.css('background-color', '');
    Field_list[Player_list[number].location].td.css('opacity', '0.7');
    Player_list[number] = "";
    Player_number[number] = 0;
    $('#log').append("<br/>�÷��̾�" + number + " ����");
}

function movePlayer(player, index) {
    Field_list[Player_list[player].location].td.css('background-color', '');
    Field_list[Player_list[player].location].td.css('opacity', '0.7');
    Player_list[player].location = index;
    Field_list[index].td.css('background-color', Player_color[player]);
    Field_list[index].td.css('opacity', 1);

    $('#log').append("<br/>�÷��̾�" + player + " " + Field_list[index].name + "(��)�� �̵�");
    redraw(player);
    actionNext(player, index);
    
}

function actionNext(player, index) {
    var state = STATE_TOLL;
    switch(index) {
        case 2:
        case 7:
        case 12:
        case 17:
        case 22:
        case 35:
            // Ȳ�ݿ���
            state = STATE_GOLDENKEY;
            break;
        case 10:
            //���ε�
            state = STATE_ALONE;
            break;
        case 0:
            //���
            break;
        case 20:
            state = STATE_RECVFUND;
            // ��ȸ���� ��� ����ó
            break;
        case 38:
            state = STATE_FUND;
            // ��ȸ������� ���� ��
            break;
        case 30:
            // ���ֿ���
            state = STATE_SPACETRIP;
            break;
    }
    if(state == STATE_FUND) {
        if(Player_list[player].money < 150000) {
            //���ӿ���
        } else {
            Player_list[player].money -= 150000;
            mFund += 150000;
        }
    } else if(state == STATE_RECVFUND) {
        Player_list[player].money += mFund;
        mFund = 0;
    } else if(state == STATE_ALONE) {
        Player_list[player].countAlone++;
    } else if(state == STATE_GOLDENKEY) {

    } else if(state == STATE_TOLL){
        if(Field_list[index].owner == -1) {
            state = STATE_BUYLAND;
            //�����ǻ�
            //alert("�����Ͻðڽ��ϱ�");
        } else {
            var toll = Field_list[index].toll_default;
            toll += (Field_list[index].villa == 1) ? Field_list[index].toll_villa : 0;
            toll += (Field_list[index].building == 1) ? Field_list[index].toll_building : 0;
            toll += (Field_list[index].hotel == 1) ? Field_list[index].toll_hotel : 0;

            if(Player_list[player].money < toll) {
                //���� ����
                alert("���ӿ���");
            } else {
                Player_list[player].money - toll;
            }
        }

    }
    redraw(player);
}
function salary(player){
    Player_list[player].money+=200000;
    redraw(player);
}

function buyLand(player, index) {
    if(Field_list[index].owner != -1) {
        alert("�̹� ������ ����");
        return false;
        // ������ ����
    } else {
        if(Field_list[index].value > Player_list[player].money) {
            alert("���� �ݾ� ����");
            return false;
            // ���� �ݾ� ����
        } else if(Field_list[index].available == 0) {
            alert("�Ǽ� �Ұ� ����");
            return false;
            // �Ǽ� �Ұ� ����
        } else {
            Player_list[player].money -= Field_list[index].value;
            Field_list[index].owner = player;
            redraw(player);
            return true;
        }
    }
    return false;
    // ����ġ ���� ����
}

function build(player, index, building) {
    var val = 0;
    if(building == 0) {
        val = Field_list[index].price_villa;
    } else if(building == 1) {
        val = Field_list[index].price_building;
    } else if(building == 2) {
        val = Field_list[index].price_hotel;
    }
    if(Field_list[index].owner == player) {
        if(Player_list[player].money < val) {
            alert("���� �ݾ� ����");
            return false;
            // ���� �ݾ� ����
        } else {
            switch(building) {
                case 0:
                    Field_list[index].villa = 1;
                    Player_list[player].money -= Field_list[index].price_villa;
                    break;
                case 1:
                    Field_list[index].building = 1;
                    Player_list[player].money -= Field_list[index].price_building;
                    break;
                case 2:
                    Field_list[index].hotel = 1;
                    Player_list[player].money -= Field_list[index].price_hotel;
                    break;
            }
        }
        redraw(player);
        return true;
    } else {
        alert("�����ְ� �ƴ� : (����)" + Field_list[index].owner + "(�䱸)" + player);
        return false;
        // �����ְ� �ƴ�
    }
    return false;
    // ����
}
function dice(player, n1, n2){
    if(n1==n2){
        Player_list[player].countAlone = 0;
        mTurnState = STATE_DOUBLE;
    }
    movePlayer(player, Player_list[player].location+n1+n2);
}
function redraw(player){
    $('#money_player'+player).html(Player_list[player].money);
    $('#name_player'+player).html(Player_list[player].playerName);
    
    if(Field_list[Player_list[player].location].villa==1){
        Field_list[Player_list[player].location].td.children().children('.f_bottom').children('.f_bottom_1').css('opacity', 1.0);
    }
    if(Field_list[Player_list[player].location].building==1){
        Field_list[Player_list[player].location].td.children().children('.f_bottom').children('.f_bottom_2').css('opacity', 1.0);
    }
    if(Field_list[Player_list[player].location].hotel==1){
        Field_list[Player_list[player].location].td.children().children('.f_bottom').children('.f_bottom_3').css('opacity', 1.0);
        
    }
}
function startGame() {
    $('#body').show();
    $('#initPage').hide();
    var cnt = 0;
    for( i = 0; i < 4; i++) {
        if(Player_number == 1) {
            cnt++;
        }
    }
    mTurnNumber = 0;
    mTurnState = 0;
    
    for(i=0;i<4;i++){
        $('#money_player'+i).html(Player_list[i].money);
    }

}

function ready(number){
    Player_list[number].ready = 1;
    $('#ready_player'+number).show();
    var cnt = 0;
    var cnt_ready = 0;
    for(i=0;i<4;i++){
        cnt += Player_number[i];
        if(Player_number[i]){
            cnt_ready += Player_list[i].ready;
        }
    }
    if(cnt==cnt_ready && cnt>=2){
        startGame();
    }
}

function setJunction(){
    var script = {ad:"Bluemarble", sessionID:UUID, host:mHost};
        junction.onActivityJoin = function(){
        }
        junction.onMessageReceived = function(msg){
            if(msg.service == "join"){
                var number = 0;
                if(msg.IMEI==null){
                    alert("�߸��� Join");
                } else{
                    number = joinPlayer(msg.IMEI, msg.name);
                    junction.sendMessageToSession({'service':'ackjoin', 'number':number});
                }
            }
            else if(msg.service == "leave"){
                if(msg.number==null){
                    alert("�߸��� leave");
                } else{
                    leavePlayer(msg.number);
                }
            }
            else if(msg.service == "ready"){
                if(msg.number==null){
                    alert("�߸��� ready");
                } else{
                    ready(msg.number);
                }
            }
            else if(msg.service == "action"){
            }
        }
        JX.getInstance(mHost).newJunction(script, junction);
}

$(document).ready(function() {
    Player_color = ['red', 'blue', 'green', 'yellow'];
    init();
    setJunction();
    //test();
    $('#testBox').keydown(function(e) {
    if(e.keyCode == 13)
        eval($('#testBox').val());
    });
    
});

