export default {
    'summary': {
        'title': 'Demo Threat Model',
        'owner': 'Mike Goodwin',
        'description': 'A sample model of a web application, with a queue-decoupled background process.',
        'id': 0
    },
    'detail': {
        'contributors': [
            {
                'name': 'Tom Brown'
            },
            {
                'name': 'Albert Moneypenny'
            }
        ],
        'diagrams': [
            {
                'title': 'Main Request Data Flow',
                'thumbnail': './public/content/images/thumbnail.stride.jpg',
                'id': 0,
                'diagramType': 'STRIDE',
                'diagramJson': {
                    'cells': [
                        {
                            'type': 'tm.Store',
                            'size': {
                                'width': 160,
                                'height': 80
                            },
                            'position': {
                                'x': 565,
                                'y': 414
                            },
                            'angle': 0,
                            'id': 'a25bbb4e-093f-4238-a620-31efdee452dc',
                            'z': 1,
                            'threats': [
                                {
                                    'status': 'Open',
                                    'severity': 'High',
                                    'mitigation': 'Encrypt the DB credentials in the configuration file.\n\nExpire and replace the DB credentials regularly.',
                                    'description': 'The Background Worker configuration stores the credentials used by the worker to access the DB. An attacker could compromise the Background Worker and get access to the DB credentials.',
                                    'title': 'Accessing DB credentials',
                                    'type': 'Information disclosure'
                                }
                            ],
                            'storesCredentials': true,
                            'hasOpenThreats': true,
                            'attrs': {
                                '.element-shape': {
                                    'class': 'element-shape hasOpenThreats isInScope'
                                },
                                'text': {
                                    'text': 'Worker Config'
                                },
                                '.undefined': {
                                    'class': 'undefinedhasOpenThreats isInScope'
                                },
                                '.element-text': {
                                    'class': 'element-text hasOpenThreats isInScope'
                                }
                            }
                        },
                        {
                            'type': 'tm.Store',
                            'size': {
                                'width': 160,
                                'height': 80
                            },
                            'position': {
                                'x': 290,
                                'y': 420
                            },
                            'angle': 0,
                            'id': '936557f9-22e2-4bac-bb70-0089c5c2fbe1',
                            'z': 2,
                            'isALog': true,
                            'threats': [
                                {
                                    'status': 'Mitigated',
                                    'severity': 'High',
                                    'description': 'An attacker could make an query call on the DB,',
                                    'title': 'Unauthorised access',
                                    'type': 'Information disclosure',
                                    'mitigation': 'Require all queries to be authenticated.'
                                },
                                {
                                    'status': 'Open',
                                    'severity': 'Medium',
                                    'description': 'An attacker could obtain the DB credentials ans use them to make unauthorised queries.',
                                    'title': 'Credential theft',
                                    'type': 'Information disclosure',
                                    'mitigation': 'Use a firewall to restrict access to the DB to only the Background Worker IP address.'
                                }
                            ],
                            'outOfScope': false,
                            'hasOpenThreats': true,
                            'attrs': {
                                '.element-shape': {
                                    'class': 'element-shape hasOpenThreats isInScope'
                                },
                                'text': {
                                    'text': 'Database'
                                },
                                '#element-shape': {
                                    'class': ''
                                },
                                '.undefined': {
                                    'class': 'undefinedhasOpenThreats isInScope'
                                },
                                '.element-text': {
                                    'class': 'element-text hasOpenThreats isInScope'
                                }
                            }
                        },
                        {
                            'type': 'tm.Store',
                            'size': {
                                'width': 160,
                                'height': 80
                            },
                            'position': {
                                'x': 40,
                                'y': 420
                            },
                            'angle': 0,
                            'id': 'bdd3e115-4b92-4020-90b7-c3351dba292b',
                            'z': 3,
                            'threats': [
                                {
                                    'status': 'Open',
                                    'severity': 'High',
                                    'title': 'Credentials should be encrypted',
                                    'type': 'Information disclosure',
                                    'description': 'The Web Application Config stores credentials used  by the Web App to access the message queue. These could be stolen by an attacker and used to read confidential data or place poison message on the queue.',
                                    'mitigation': 'The Message Queue credentials should be encrypted.'
                                }
                            ],
                            'storesCredentials': true,
                            'hasOpenThreats': true,
                            'outOfScope': false,
                            'attrs': {
                                '.element-shape': {
                                    'class': 'element-shape hasOpenThreats isInScope'
                                },
                                'text': {
                                    'text': 'Web Application Config'
                                },
                                '.undefined': {
                                    'class': 'undefinedhasOpenThreats isInScope'
                                },
                                '.element-text': {
                                    'class': 'element-text hasOpenThreats isInScope'
                                }
                            }
                        },
                        {
                            'type': 'tm.Store',
                            'size': {
                                'width': 160,
                                'height': 80
                            },
                            'position': {
                                'x': 502,
                                'y': 13
                            },
                            'angle': 0,
                            'id': 'ec574fb4-87e7-494b-88dc-2a3c99172067',
                            'z': 4,
                            'threats': [
                                {
                                    'status': 'Open',
                                    'severity': 'Low',
                                    'title': 'Message secrecy',
                                    'type': 'Information disclosure',
                                    'description': 'The data flow between the Web Application and the Background Worker is not point-to-point and therefore end-to-end secrecy cannot be provided at the transport layer. Messages could be read by an attacker at rest in the Message Queue.',
                                    'mitigation': 'Use message level encryption for high sensitivity data (e.g. security tokens) in messages.'
                                },
                                {
                                    'status': 'Open',
                                    'severity': 'Medium',
                                    'title': 'Message tampering',
                                    'type': 'Tampering',
                                    'description': 'Messages on the queue could be tampered with, causing incorrect processing by the Background Worker.',
                                    'mitigation': 'Sign all queue messages at the Web Server. Validate the message signature at the Background Worker and reject any message with a missing or invalid signature. Log any failed messages.'
                                },
                                {
                                    'status': 'Mitigated',
                                    'severity': 'High',
                                    'title': 'Fake messages could be placed on the queue',
                                    'type': 'Spoofing',
                                    'description': 'An attacker could put a fake message on queue, causing the Background Worker to do incorrect processing.',
                                    'mitigation': 'Restrict access to the queue to the IP addresses of the Web Server and Background Worker.\n\nImplement authentication on the queue endpoint.'
                                }
                            ],
                            'outOfScope': false,
                            'hasOpenThreats': true,
                            'attrs': {
                                '.element-shape': {
                                    'class': 'element-shape hasOpenThreats isInScope'
                                },
                                'text': {
                                    'text': 'Message Queue'
                                },
                                '#element-shape': {
                                    'class': ''
                                },
                                '.undefined': {
                                    'class': 'undefinedhasOpenThreats isInScope'
                                },
                                '.element-text': {
                                    'class': 'element-text hasOpenThreats isInScope'
                                }
                            }
                        },
                        {
                            'type': 'tm.Process',
                            'size': {
                                'width': 100,
                                'height': 100
                            },
                            'position': {
                                'x': 560,
                                'y': 180
                            },
                            'angle': 0,
                            'id': '3e75b596-9c70-41b6-a2cf-a15899c254d3',
                            'z': 5,
                            'threats': [
                                {
                                    'status': 'Open',
                                    'severity': 'Medium',
                                    'title': 'Poison messages 1',
                                    'type': 'Denial of service',
                                    'description': 'An attacker could generate a malicious message that the Background Worker cannot process.',
                                    'mitigation': 'Implement a poison message queue where messages are placed after a fixed number of retries.'
                                },
                                {
                                    'status': 'Open',
                                    'severity': 'Medium',
                                    'mitigation': 'Validate the content of all messages, before processing. Reject any message that have invalid content and log the rejection. Do not log the malicious content - instead log a description of the error.',
                                    'type': 'Denial of service',
                                    'title': 'Poison messages 2',
                                    'description': 'An attacker could generate a malicious message that the Background Worker cannot process.'
                                }
                            ],
                            'privilegeLevel': 'executionContext =Limited',
                            'outOfScope': false,
                            'hasOpenThreats': true,
                            'attrs': {
                                '.element-shape': {
                                    'class': 'element-shape hasOpenThreats isInScope'
                                },
                                'text': {
                                    'text': 'Background\nWorker Process'
                                },
                                '#element-shape': {
                                    'class': ''
                                },
                                '#element-process': {
                                    'class': 'outOfScopeElement'
                                },
                                '.undefined': {
                                    'class': 'undefinedhasOpenThreats isInScope'
                                },
                                '.element-text': {
                                    'class': 'element-text hasOpenThreats isInScope'
                                }
                            }
                        },
                        {
                            'type': 'tm.Process',
                            'size': {
                                'width': 100,
                                'height': 100
                            },
                            'position': {
                                'x': 210,
                                'y': 180
                            },
                            'angle': 0,
                            'id': '0d9909ea-1398-4898-be81-cf1c808324dc',
                            'z': 6,
                            'privilegeLevel': 'executionContext =Limited',
                            'outOfScope': false,
                            'hasOpenThreats': false,
                            'attrs': {
                                '.element-shape': {
                                    'class': 'element-shape hasNoOpenThreats isInScope'
                                },
                                'text': {
                                    'text': 'Web\nApplication'
                                },
                                '#element-process': {
                                    'class': 'outOfScopeElement'
                                },
                                '.undefined': {
                                    'class': 'undefinedhasNoOpenThreats isInScope'
                                },
                                '.element-text': {
                                    'class': 'element-text hasNoOpenThreats isInScope'
                                }
                            }
                        },
                        {
                            'type': 'tm.Actor',
                            'size': {
                                'width': 160,
                                'height': 80
                            },
                            'position': {
                                'x': 40,
                                'y': 29
                            },
                            'angle': 0,
                            'id': 'b394f9f7-07ca-42bc-b616-ad77c6fbfcce',
                            'z': 7,
                            'threats': [],
                            'outOfScope': false,
                            'hasOpenThreats': false,
                            'attrs': {
                                '.element-shape': {
                                    'class': 'element-shape hasNoOpenThreats isInScope'
                                },
                                'text': {
                                    'text': 'Browser'
                                },
                                '#element-shape': {
                                    'class': ''
                                },
                                '.undefined': {
                                    'class': 'undefinedhasNoOpenThreats isInScope'
                                },
                                '.element-text': {
                                    'class': 'element-text hasNoOpenThreats isInScope'
                                }
                            }
                        },
                        {
                            'type': 'tm.Boundary',
                            'size': {
                                'width': 10,
                                'height': 10
                            },
                            'smooth': true,
                            'source': {
                                'x': 80,
                                'y': 220
                            },
                            'target': {
                                'x': 295,
                                'y': 51
                            },
                            'vertices': [
                                {
                                    'x': 276,
                                    'y': 149
                                }
                            ],
                            'id': '64d52ab0-9733-4ae9-af1b-a347cbc13186',
                            'z': 8,
                            'attrs': {}
                        },
                        {
                            'type': 'tm.Boundary',
                            'size': {
                                'width': 10,
                                'height': 10
                            },
                            'smooth': true,
                            'source': {
                                'x': 350,
                                'y': 10
                            },
                            'target': {
                                'x': 663,
                                'y': 156
                            },
                            'vertices': [
                                {
                                    'x': 333,
                                    'y': 117
                                },
                                {
                                    'x': 432,
                                    'y': 180
                                }
                            ],
                            'id': '70a1b898-4131-462f-a26e-1adf9f2b2eda',
                            'z': 9,
                            'attrs': {}
                        },
                        {
                            'type': 'tm.Flow',
                            'size': {
                                'width': 10,
                                'height': 10
                            },
                            'smooth': true,
                            'source': {
                                'id': 'b394f9f7-07ca-42bc-b616-ad77c6fbfcce'
                            },
                            'target': {
                                'id': '0d9909ea-1398-4898-be81-cf1c808324dc'
                            },
                            'vertices': [
                                {
                                    'x': 245,
                                    'y': 112
                                }
                            ],
                            'id': '56b56e8c-751d-4d8a-a9c7-6554c9f142ee',
                            'labels': [
                                {
                                    'position': 0.5,
                                    'attrs': {
                                        'text': {
                                            'text': 'Web Request',
                                            'font-weight': '400',
                                            'font-size': 'small'
                                        }
                                    }
                                }
                            ],
                            'z': 10,
                            'threats': [
                                {
                                    'status': 'Mitigated',
                                    'severity': 'High',
                                    'title': 'Data flow should use HTTP/S',
                                    'type': 'Information disclosure',
                                    'description': 'These requests are made over the public internet and could be intercepted by an attacker.',
                                    'mitigation': 'The requests should require HTTP/S. This will provide confidentiality and integrity. HTTP should not be supported.'
                                }
                            ],
                            'isPublicNetwork': true,
                            'isEncrypted': true,
                            'protocol': 'HTTP/S',
                            'outOfScope': false,
                            'hasOpenThreats': false,
                            'attrs': {
                                '.marker-target': {
                                    'class': 'marker-target hasNoOpenThreats isInScope'
                                },
                                '.connection': {
                                    'class': 'connection hasNoOpenThreats isInScope'
                                }
                            }
                        },
                        {
                            'type': 'tm.Flow',
                            'size': {
                                'width': 10,
                                'height': 10
                            },
                            'smooth': true,
                            'source': {
                                'id': '0d9909ea-1398-4898-be81-cf1c808324dc'
                            },
                            'target': {
                                'id': 'ec574fb4-87e7-494b-88dc-2a3c99172067'
                            },
                            'vertices': [
                                {
                                    'x': 351,
                                    'y': 120
                                }
                            ],
                            'id': '86347588-6629-45e3-a441-09ca11bce894',
                            'labels': [
                                {
                                    'position': 0.5,
                                    'attrs': {
                                        'text': {
                                            'text': 'Put Message',
                                            'font-weight': '400',
                                            'font-size': 'small'
                                        }
                                    }
                                }
                            ],
                            'z': 13,
                            'threats': [
                                {
                                    'status': 'Open',
                                    'severity': 'High',
                                    'description': 'These requests are made over the public internet and could be intercepted by an attacker.',
                                    'title': 'Data flow should use HTTP/S',
                                    'type': 'Information disclosure',
                                    'mitigation': 'The requests should require HTTP/S. This will provide confidentiality and integrity. HTTP should not be supported.'
                                }
                            ],
                            'outOfScope': false,
                            'hasOpenThreats': true,
                            'attrs': {
                                '.marker-target': {
                                    'class': 'marker-target hasOpenThreats isInScope'
                                },
                                '.connection': {
                                    'class': 'connection hasOpenThreats isInScope'
                                }
                            }
                        },
                        {
                            'type': 'tm.Flow',
                            'size': {
                                'width': 10,
                                'height': 10
                            },
                            'smooth': true,
                            'source': {
                                'id': 'ec574fb4-87e7-494b-88dc-2a3c99172067'
                            },
                            'target': {
                                'id': '3e75b596-9c70-41b6-a2cf-a15899c254d3'
                            },
                            'vertices': [
                                {
                                    'x': 544,
                                    'y': 127
                                }
                            ],
                            'id': '4bbf279c-49c7-436d-9afa-e94435e6ec72',
                            'labels': [
                                {
                                    'position': 0.5,
                                    'attrs': {
                                        'text': {
                                            'text': 'Message',
                                            'font-weight': '400',
                                            'font-size': 'small'
                                        }
                                    }
                                }
                            ],
                            'z': 14,
                            'threats': [
                                {
                                    'status': 'Open',
                                    'severity': 'High',
                                    'mitigation': 'The requests should require HTTP/S. This will provide confidentiality and integrity. HTTP should not be supported.',
                                    'type': 'Information disclosure',
                                    'title': 'Data flow should use HTTP/S',
                                    'description': 'These requests are made over the public internet and could be intercepted by an attacker.'
                                }
                            ],
                            'outOfScope': false,
                            'hasOpenThreats': true,
                            'attrs': {
                                '.marker-target': {
                                    'class': 'marker-target hasOpenThreats isInScope'
                                },
                                '.connection': {
                                    'class': 'connection hasOpenThreats isInScope'
                                }
                            }
                        },
                        {
                            'type': 'tm.Flow',
                            'size': {
                                'width': 10,
                                'height': 10
                            },
                            'smooth': true,
                            'source': {
                                'id': '936557f9-22e2-4bac-bb70-0089c5c2fbe1'
                            },
                            'target': {
                                'id': '3e75b596-9c70-41b6-a2cf-a15899c254d3'
                            },
                            'vertices': [
                                {
                                    'x': 466,
                                    'y': 347
                                }
                            ],
                            'id': '75949d2c-0449-4a10-add3-07ac91a0c608',
                            'labels': [
                                {
                                    'position': 0.5,
                                    'attrs': {
                                        'text': {
                                            'text': 'Worker Query Results',
                                            'font-weight': '400',
                                            'font-size': 'small'
                                        }
                                    }
                                }
                            ],
                            'z': 17,
                            'threats': [
                                {
                                    'status': 'Open',
                                    'severity': 'Low',
                                    'title': 'Man in the middle attack',
                                    'type': 'Information disclosure',
                                    'mitigation': 'Enforce an encrypted connection at the DB server',
                                    'description': 'An attacker could intercept the DB queries in transit and obtain sensitive information, such as DB credentials, query parameters or query results (is unlikely since the data flow is over a private network).'
                                }
                            ],
                            'outOfScope': false,
                            'hasOpenThreats': true,
                            'attrs': {
                                '.marker-target': {
                                    'class': 'marker-target hasOpenThreats isInScope'
                                },
                                '.connection': {
                                    'class': 'connection hasOpenThreats isInScope'
                                }
                            }
                        },
                        {
                            'type': 'tm.Boundary',
                            'size': {
                                'width': 10,
                                'height': 10
                            },
                            'smooth': true,
                            'source': {
                                'x': 241,
                                'y': 444
                            },
                            'target': {
                                'x': 526,
                                'y': 465
                            },
                            'vertices': [
                                {
                                    'x': 333,
                                    'y': 288
                                },
                                {
                                    'x': 488,
                                    'y': 267
                                },
                                {
                                    'x': 552,
                                    'y': 339
                                }
                            ],
                            'id': 'a61cbe16-7e3f-400c-a0ea-c0695253c6ad',
                            'z': 18,
                            'attrs': {}
                        },
                        {
                            'type': 'tm.Flow',
                            'size': {
                                'width': 10,
                                'height': 10
                            },
                            'smooth': true,
                            'source': {
                                'id': '0d9909ea-1398-4898-be81-cf1c808324dc'
                            },
                            'target': {
                                'id': 'b394f9f7-07ca-42bc-b616-ad77c6fbfcce'
                            },
                            'vertices': [
                                {
                                    'x': 111,
                                    'y': 175
                                }
                            ],
                            'id': '1b1cf1eb-d9ac-463b-a9ae-d816c42e7107',
                            'labels': [
                                {
                                    'position': 0.5,
                                    'attrs': {
                                        'text': {
                                            'text': 'Web Response',
                                            'font-weight': '400',
                                            'font-size': 'small'
                                        }
                                    }
                                }
                            ],
                            'z': 19,
                            'isEncrypted': true,
                            'isPublicNetwork': true,
                            'protocol': 'HTTP/S',
                            'threats': [
                                {
                                    'status': 'Mitigated',
                                    'severity': 'High',
                                    'title': 'Data flow should use HTTP/S',
                                    'type': 'Information disclosure',
                                    'description': 'These responses are over the public internet and could be intercepted by an attacker.',
                                    'mitigation': 'The requests should require HTTP/S. This will provide confidentiality and integrity. HTTP should not be supported.'
                                }
                            ],
                            'outOfScope': false,
                            'hasOpenThreats': false,
                            'attrs': {
                                '.marker-target': {
                                    'class': 'marker-target hasNoOpenThreats isInScope'
                                },
                                '.connection': {
                                    'class': 'connection hasNoOpenThreats isInScope'
                                }
                            }
                        },
                        {
                            'type': 'tm.Flow',
                            'size': {
                                'width': 10,
                                'height': 10
                            },
                            'smooth': true,
                            'source': {
                                'id': 'bdd3e115-4b92-4020-90b7-c3351dba292b'
                            },
                            'target': {
                                'id': '0d9909ea-1398-4898-be81-cf1c808324dc'
                            },
                            'vertices': [
                                {
                                    'x': 157,
                                    'y': 292
                                }
                            ],
                            'id': 'c8c746d8-2a26-464e-8524-3350be8dcae5',
                            'labels': [
                                {
                                    'position': 0.5,
                                    'attrs': {
                                        'text': {
                                            'text': 'Read web app config',
                                            'font-weight': '400',
                                            'font-size': 'small'
                                        }
                                    }
                                }
                            ],
                            'z': 20,
                            'outOfScope': true,
                            'reasonOutOfScope': 'This data flow represents a read from the file system',
                            'hasOpenThreats': false,
                            'attrs': {
                                '.marker-target': {
                                    'class': 'marker-target hasNoOpenThreats isInScope'
                                },
                                '.connection': {
                                    'class': 'connection hasNoOpenThreats isOutOfScope'
                                }
                            }
                        },
                        {
                            'type': 'tm.Flow',
                            'size': {
                                'width': 10,
                                'height': 10
                            },
                            'smooth': true,
                            'source': {
                                'id': 'a25bbb4e-093f-4238-a620-31efdee452dc'
                            },
                            'target': {
                                'id': '3e75b596-9c70-41b6-a2cf-a15899c254d3'
                            },
                            'vertices': [
                                {
                                    'x': 664,
                                    'y': 320
                                }
                            ],
                            'id': '6cba52e8-0d26-481f-bcc1-dbf0b66d8b42',
                            'labels': [
                                {
                                    'position': 0.5,
                                    'attrs': {
                                        'text': {
                                            'text': 'Read worker config',
                                            'font-weight': '400',
                                            'font-size': 'small'
                                        }
                                    }
                                }
                            ],
                            'z': 21,
                            'outOfScope': true,
                            'reasonOutOfScope': 'This data flow represents a read from the file system',
                            'hasOpenThreats': false,
                            'attrs': {
                                '.marker-target': {
                                    'class': 'marker-target hasNoOpenThreats isInScope'
                                },
                                '.connection': {
                                    'class': 'connection hasNoOpenThreats isOutOfScope'
                                }
                            }
                        },
                        {
                            'type': 'tm.Flow',
                            'size': {
                                'width': 10,
                                'height': 10
                            },
                            'smooth': true,
                            'source': {
                                'id': '0d9909ea-1398-4898-be81-cf1c808324dc'
                            },
                            'target': {
                                'id': '936557f9-22e2-4bac-bb70-0089c5c2fbe1'
                            },
                            'vertices': [
                                {
                                    'x': 311,
                                    'y': 324
                                }
                            ],
                            'id': '2fd00bd2-c603-4d72-a12f-c20a3a1ba77b',
                            'labels': [
                                {
                                    'position': 0.5,
                                    'attrs': {
                                        'text': {
                                            'text': 'Queries',
                                            'font-weight': '400',
                                            'font-size': 'small'
                                        }
                                    }
                                }
                            ],
                            'z': 22,
                            'hasOpenThreats': false,
                            'isEncrypted': true,
                            'isPublicNetwork': false,
                            'attrs': {
                                '.marker-target': {
                                    'class': 'marker-target hasNoOpenThreats isInScope'
                                },
                                '.connection': {
                                    'class': 'connection hasNoOpenThreats isInScope'
                                }
                            }
                        },
                        {
                            'type': 'tm.Flow',
                            'size': {
                                'width': 10,
                                'height': 10
                            },
                            'smooth': true,
                            'source': {
                                'id': '936557f9-22e2-4bac-bb70-0089c5c2fbe1'
                            },
                            'target': {
                                'id': '0d9909ea-1398-4898-be81-cf1c808324dc'
                            },
                            'vertices': [
                                {
                                    'x': 377,
                                    'y': 280
                                }
                            ],
                            'id': 'd117ddba-2508-45ce-b9ea-fb9df56a79e5',
                            'labels': [
                                {
                                    'position': 0.5,
                                    'attrs': {
                                        'text': {
                                            'text': 'Web App Query\nResults',
                                            'font-weight': '400',
                                            'font-size': 'small'
                                        }
                                    }
                                }
                            ],
                            'z': 23,
                            'hasOpenThreats': false,
                            'isEncrypted': true,
                            'attrs': {
                                '.marker-target': {
                                    'class': 'marker-target hasNoOpenThreats isInScope'
                                },
                                '.connection': {
                                    'class': 'connection hasNoOpenThreats isInScope'
                                }
                            }
                        },
                        {
                            'type': 'tm.Flow',
                            'size': {
                                'width': 10,
                                'height': 10
                            },
                            'smooth': true,
                            'source': {
                                'id': '3e75b596-9c70-41b6-a2cf-a15899c254d3'
                            },
                            'target': {
                                'id': '936557f9-22e2-4bac-bb70-0089c5c2fbe1'
                            },
                            'vertices': [
                                {
                                    'x': 552,
                                    'y': 382
                                }
                            ],
                            'id': '015880b7-fb7a-4fe3-b729-fbd40bd7afcb',
                            'labels': [
                                {
                                    'position': 0.5,
                                    'attrs': {
                                        'text': {
                                            'text': 'Worker Queries',
                                            'font-weight': '400',
                                            'font-size': 'small'
                                        }
                                    }
                                }
                            ],
                            'z': 24,
                            'hasOpenThreats': false,
                            'attrs': {
                                '.marker-target': {
                                    'class': 'marker-target hasNoOpenThreats isInScope'
                                },
                                '.connection': {
                                    'class': 'connection hasNoOpenThreats isInScope'
                                }
                            }
                        }
                    ]
                },
                'size': {
                    'height': 594,
                    'width': 860
                }
            }
        ],
        'reviewer': 'Jane Smith'
    }
};
