const fs = require('fs');
const dbUser = require('../models/user.model');

exports.getProfile = function (req, res) {
    let username = req.params.username;
    dbUser.findOne({ username: username }, function (err, doc) {
        var createat = doc.createAt.toLocaleDateString();
        res.render('profile', {
            layout: 'layout',
            title: 'profile',
            admin: req.user,
            user: doc,
            date: createat
        });
    })
}

exports.postProfile = function(req, res){
    let username = req.params.username;
    let rb = req.body,
    email = rb.email,
    firstname = rb.firstname,
    lastname = rb.lastname,
    phone = rb.phone,
    country = rb.country,
    active = rb.active,
    avatar = req.file,
    description = rb.description;
    dbUser.findOne({username: username}, function(err, doc){
        if(email != ''){
            doc.email = email;
        }
        if(firstname != ''){
            doc.firstname = firstname;
        }
        if(lastname != ''){
            doc.lastname = lastname;
        }
        if(phone != ''){
            doc.phone = phone
        }
        if(country != ''){
            doc.country = country;
        }
        doc.active = active;
        if(avatar != undefined){
            avatar = req.file.filename;
            if(doc.avatar == 'default-avatar.png'){
                doc.avatar = avatar;
            }else{
                fs.unlink('public/img/user/' + doc.avatar , function(){});
                doc.avatar = avatar;
            }
        }else{
            avatar = 'default-avatar.png';
            doc.avatar = avatar;
        }
        doc.description = description;
        doc.save();
    })
}