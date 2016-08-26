Parse.Cloud.afterSave('Notification', function (request) {
    var notification = request.object;
    var query = new Parse.Query(Parse.Installation);
    var data = {};
    var type = notification.get('type');
    data = { alert: 'Nova notificaçao', type: type, notificationId: notification.id };

    if (type === 'mail' || type === 'visitor_arrived' || type === 'visitor_left') {
        query.equalTo('username', notification.get("username"));
        console.log("Will send " + type + " to " + notification.get("username"));
    }
    else if (type === 'condo_notice') {
        var condo = notification.get("condo");
        query.equalTo('condo', condo);
        console.log("Will send " + type + " to condominos from " + condo);
    }

    Parse.Push.send(
        {
            where: query,
            data: data
        },
        {
            useMasterKey: true,
            success: function () {
                console.log('Error ' + error);
            },
            error: function (error) {
                console.log('Error ' + error);
            }
        }
    );
});
