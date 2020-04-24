var dazzle = angular.module("dazzle");

dazzle.service("$dazzleS3", function () {
  var that = this;
			
			
			this.saveTemplate = function (template) {
				return new Promise(function (resolve, reject) {

					console.log('Template:',template);
					$http({
						"method": "post",
						"url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
						"data": {
							"type": "updateTemplate",
							"template": template
						}
					}).then(function () {
						resolve();
					},function(){
						reject();
					});
				});
			};
		

		
            this.getJson = function (bucket, key) {
                return new Promise(function (resolve, reject) {
                    var s3 = new AWS.S3();
                    var params = {
                        Bucket: bucket,
                        Key: key,
                        ResponseExpires: new Date().getTime()
                    };
                    s3.getObject(params, function (err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            try {
                                resolve(JSON.parse(data.Body.toString()));
                            } catch (e) {
                                reject();
                            }
                        }
                    });
                });
            }

            this.saveJson = function (bucket, key, json) {
                return new Promise(function (resolve, reject) {
                    var s3 = new AWS.S3();
                    var params = {
                        Bucket: bucket,
                        Key: key,
                        ContentType: "application/json",
                        Body: JSON.stringify(json, null, 4)
                    }
                    s3.putObject(params, function (err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                })
            }

            this.copyFolder = function(bucket,src, dest){
                return new Promise(function (resolve, reject) {
                    var s3 = new AWS.S3();
                    var params = {
                        Bucket: bucket,
                        Prefix: src
                    };
                    s3.listObjects(params, function (err, data) {
                        if (err) return callback(err);

                        console.log('Data',data);
                        var count = 0;
                        data.Contents.forEach(function (content) {

                            var str = content.Key;
                            str = str.replace(src,dest);

                            that.getFile(bucket,content.Key).then(function(data2){
                                that.saveFile(bucket,str,data2).then(function(data3){
                                    count++;
                                    console.log(count);
                                    console.log(data.Contents.length);
                                    if (count == data.Contents.length)
                                        resolve(data3);
                                },function(){
                                    reject();
                                });
                            },function(){
                                reject();
                            });

                        });


                    });
                });
            }

            this.removeFolder = function(bucket,prefix){
                return new Promise(function (resolve, reject) {
                    var s3 = new AWS.S3();
                    var params = {
                        Bucket: bucket,
                        Prefix: prefix
                    };
                    s3.listObjects(params, function (err, data) {
                        if (err) return callback(err);

                        if (data.Contents.length == 0) callback();

                        params = {Bucket: bucket};
                        params.Delete = {Objects: []};

                        data.Contents.forEach(function (content) {
                            params.Delete.Objects.push({Key: content.Key});
                        });

                        s3.deleteObjects(params, function (err, data) {
                            if (err) return callback(err);
                            if (data.Contents.length == 1000) emptyBucket(bucketName, callback);
                            else callback();
                        });
                    });
                });
            }

            this.removeFile = function (bucket, key) {
                return new Promise(function (resolve, reject) {
                    var s3 = new AWS.S3();
                    var params = {
                        Bucket: bucket,
                        Key: key
                    };
                    s3.deleteObject(params, function (err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });
            }

            this.getFile = function (bucket, key) {
                return new Promise(function (resolve, reject) {
                    var s3 = new AWS.S3();
                    var params = {
                        Bucket: bucket,
                        Key: key,
                        ResponseExpires: new Date().getTime()
                    };
                    s3.getObject(params, function (err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data.Body.toString());
                        }
                    });
                });
            }

            this.saveFile = function (bucket, key, string) {
                return new Promise(function (resolve, reject) {
                    var s3 = new AWS.S3();
                    var params = {
                        Bucket: bucket,
                        Key: key,
                        Body: string
                    }

                    var ext = key.substr(key.lastIndexOf('.') + 1);
                    if (ext === 'css') {
                        params.ContentType = 'text/css';
                    } else if (ext === 'less') {
                        params.ContentType = 'text/css';
                    } else if (ext === 'js') {
                        params.ContentType = 'application/javascript';
                    } else if (ext === 'json') {
                        params.ContentType = 'application/json';
                    } else if (ext === 'jpg') {
                        params.ContentType = 'image/jpeg';
                    } else if (ext === 'jpeg') {
                        params.ContentType = 'image/jpeg';
                    } else if (ext === 'png') {
                        params.ContentType = 'image/png';
                    } else if (ext === 'gif') {
                        params.ContentType = 'image/gif';
                    } else if (ext === 'html') {
                        params.ContentType = 'text/html';						
					}

                    s3.putObject(params, function (err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });
            }

            this.saveMyImage = function (uid, file,subowner=0) {
                return new Promise(function (resolve, reject) {
    
                     var s3 = new AWS.S3();
                    
                    var oldFilename = encodeURIComponent(file.name);
                    var fileExtansion = oldFilename.split('.').pop();
                    var newId = 'id' + new Date().getTime()
                    var newFilename =  newId + '.jpg';
                    var params = {
                        Bucket: "designerrrr",
                        Key: "images/" + uid + "/" + newFilename,
                        ContentType: file.type,
                        Body: file,
                        Metadata: {
                            "newVersion": "new",
                            "gid": newId,
                            "owner_id": uid,
                            "original_name": oldFilename,
                            "galleryType": "photo",
                            "subowner": subowner
                        }

                    };
                    console.log('Sub-owner',subowner);
                    // if (subowner !='')
                    //         params.Metadata['subowner'] = subowner;

                    s3.putObject(params, function (err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({
                                "oldFilename": oldFilename,
                                "newFilename": newFilename,
                                "fileExtansion": fileExtansion,
                                "fileType": file.type
                            });
                        }
                    });
                });
            }

            this.saveImage = function (uid, file) {
                return new Promise(function (resolve, reject) {
                    var s3 = new AWS.S3();
                    var oldFilename = encodeURIComponent(file.name);
                    var fileExtansion = oldFilename.split('.').pop();
                    var newId = 'id' + new Date().getTime()
                    var newFilename =  newId + '.jpg';
                    var params = {
                        Bucket: "designerrrr",
                        Key: "images/" + uid + "/" + newFilename,
                        ContentType: file.type,
                        Body: file,
                        Metadata: {
                            "newVersion": "new",
                            "gid": newId,
                            "owner_id": uid,
                            "original_name": oldFilename,
                            "galleryType": "photo"
                        }
                    };
                    s3.putObject(params, function (err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({
                                "oldFilename": oldFilename,
                                "newFilename": newFilename,
                                "fileExtansion": fileExtansion,
                                "fileType": file.type
                            });
                        }
                    });
                });
            }

            this.listObject = function (bucket, key) {
                return new Promise(function (resolve, reject) {
                    var s3 = new AWS.S3();
                    var params = {
                        Bucket: bucket,
                        Prefix: key
                    };
                    s3.listObjects(params, function (err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data.Contents);
                        }
                    });
                });
            }

            this.copyFile = function (copySource, bucket, key) {
                return new Promise(function (resolve, reject) {
                    var s3 = new AWS.S3();
                    var params = {
                        Bucket: bucket,
                        Key: key,
                        CopySource: encodeURIComponent(copySource)
                    }
                    s3.copyObject(params, function (err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });
            }

            this.checkFile = function (bucket, key) {
                return new Promise(function (resolve, reject) {
                    var s3 = new AWS.S3();
                    var params = {
                        Bucket: bucket,
                        Key: key
                    };
                    s3.headObject(params, function (err, data) {
                        if (err) {
                            resolve(false)
                        } else {
                            resolve(true);
                        }
                    });
                });
            }

            this.getFileUrl = function (bucket, key, expires) {
                return new Promise(function (resolve, reject) {
                    var s3 = new AWS.S3();
                    var params = {
                        "Bucket": bucket,
                        "Key": key
                    };
                    if (expires) {
                        params.Expires = expires;
                    }
                    s3.getSignedUrl('getObject', params, function (err, url) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(url);
                        }
                    });
                })
            }

});