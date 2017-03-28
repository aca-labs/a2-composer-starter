/**
* @Author: Alex Sorafumo <alex.sorafumo>
* @Date:   11/01/2017 4:16 PM
* @Email:  alex@yuion.net
* @Filename: mock-system.ts
* @Last modified by:   Alex Sorafumo
* @Last modified time: 03/02/2017 2:26 PM
*/

window['systemData'] = window['systemData'] || {};
window['control'] = window['control'] || {};
window['control']['systems'] =  window['control']['systems'] || {};
window['control']['systems']['sys-B5'] = {
    System: [{
        analytics: 'UA-69533861-1',
        "$powerup": function () {
            this.state = "online";
        },
        "$shutdown": function () {
            this.state = "shutdown";
        },
        $tab: function (tab: any) {
            this.tab = tab;
        },

        $show: function (source: any, display: any) {
            var src = this.sources[source];

            console.log("SOURCE SELECT", display, source);

            // Return source and source title
            this[display] = {
                source: source,
                title: src.title,
                type: src.type
            };

            // Clear mute
            // 'Display_1' => ['Display', 1]
            if (this.outputs[display] && !this.outputs[display].no_mod) {
                var parts = display.split('_');
                this.$system[parts[0]][+parts[1] - 1].mute = false;
            }
        },
        $present: function (source: any, display: any) {
            var self = this,
            src = this.sources[source];

            // Blank means all displays
            if (display == null) {
                display = 'all_displays';
            }

            if (display == 'all_displays') {
                this.outputs.each((key: any, val: any) => {
                    self.$show.apply(self, [source, key]);
                })

                this[display] = {
                    source: source,
                    title: src.title,
                    type: src.type
                };
            } else {
                this.$show.apply(self, [source, display]);
                this['all_displays'] = null;
            }
        },
        $video_mute: function (display: any) {
            this[display] = {
                source: 'none'
            };

            if (!this.outputs[display].no_mod) {
                var parts = display.split('_');
                this.$system[parts[0]][+parts[1] - 1].mute = true;
            }
        },
        "name": "Demo Room",
        "help_msg": "For help please call <strong>0408419954</strong>",
        "state": "shutdown",
        "tab": "Camera",
        "apps": ['explorer', 'firefox', 'vlc', 'sankore'],
        "channels": [
            "7 Digital",
            "7TWO",
            "7mate",
            "ABC News",
            "ABC1",
            "ABC2",
            "ABC3",
            "ELEVEN",
            "GEM",
            "GO",
            "Nine",
            "ONE",
            "TEN",
            "ABC Dig"
        ],
        "inputs": [
            "PC",
            "Laptop",
            "Camera",
            "VC"
        ],
        "cameras": [
            "Renewables Workshop",
            "Outdoor Solar",
            "BSI Level 1",
            "BSI Level 2",
            "BSI Level 3",
            "Instrumentation & Mechanical",
            "Gas Services",
            "Electrical & HVAC South",
            "Electrical & HVAC North",
            "Finishing & Wallpaper",
            "Furniture Finishing",
            "Painting & Decorating North",
            "Painting & Decorating South",
            "Plastering North",
            "Plastering South",
            "Brick Laying",
            "Timber Installation North East",
            "Scaffolding",
            "Timber & Roof Installation North",
            "Basic Hand Skills",
            "Timber Installation North West",
            "Timber Installation South West",
            "Primary Mill North East",
            "Secondary Mill South East",
            "Primary Mill North West",
            "Secondary Mill South West",
            "Glass",
            "Aluminium",
            "rick & Tile Cutting"
        ],
        "PC": [
            "g1_pc1",
            "g1_pc2",
            "g2_pc1",
            "g2_pc2"
        ],
        "Laptop": [
            "laptop_g1",
            "laptop_g2"
        ],
        "Camera": [
            "cam_r_g1",
            "cam_f_g1",
            "cam_r_g2",
            "cam_f_g2"
        ],
        "VC": [
            "vc1",
            "vc2"
        ],
        "sources": {
            "g1_pc1": {
                "title": "1G1 PC-1",
                "input": 14,
                "source": "hdmi",
                "type": "residentpc",
                "mod": "Computer",
                "index": 1,
                "hasPTZ": true
            },
            "g1_pc2": {
                "title": "1G1 PC-2",
                "input": 15,
                "source": "hdmi",
                "type": "residentpc",
                "mod": "Computer",
                "index": 2,
                "hasWebCam": true
            },
            "g2_pc1": {
                "title": "1G2 PC-1",
                "input": 1,
                "source": "hdmi",
                "type": "residentpc",
                "mod": "Computer",
                "index": 3,
                "hasWebCam": true
            },
            "g2_pc2": {
                "title": "1G2 PC-2",
                "input": 5,
                "source": "hdmi",
                "type": "residentpc",
                "mod": "Computer",
                "index": 4
            },
            "laptop_g1": {
                "title": "1G1 Laptop",
                "input": 11,
                "source": "hdmi",
                "type": "aux_hdmi"
            },
            "laptop_g2": {
                "title": "1G2 Laptop",
                "input": 2,
                "source": "hdmi",
                "type": "aux_hdmi"
            },
            "cam_r_g1": {
                "title": "1G1 Rear",
                "type": "vc-camera",
                "mod": "Camera",
                "index": 1,
                "input": 12,
                "source": "hdmi",
                "vc_input": 2
            },
            "cam_f_g1": {
                "title": "1G1 Front",
                "type": "vc-camera",
                "mod": "Camera",
                "index": 2,
                "input": 13,
                "source": "hdmi",
                "vc_input": 1
            },
            "cam_r_g2": {
                "title": "1G2 Rear",
                "type": "vc-camera",
                "mod": "Camera",
                "index": 3,
                "input": 10,
                "source": "hdmi",
                "vc_input": 3
            },
            "cam_f_g2": {
                "title": "1G2 Front",
                "type": "vc-camera",
                "mod": "Camera",
                "index": 4,
                "input": 9,
                "source": "hdmi",
                "vc_input": 4
            },
            "vc1": {
                "title": "1G1 VC",
                "type": "vc-active",
                "input": 6,
                "content": 8
            },
            "vc2": {
                "title": "1G2 VC",
                "type": "vc-active",
                "input": 3,
                "content": 6
            }
        },
        "outputs": {
            "Display_1": {
                "screen": {
                    "module": "Screen_1",
                    "index": 1
                },
                "output": [
                    3,
                    23
                ],
                "audio_out": 21,
                "mixer_id": 105,
                "type": "projector",
                "pri": 1,
                "title": "G1 Front"
            },
            "Display_2": {
                "screen": {
                    "module": "Screen_2",
                    "index": 1
                },
                "output": [
                    4,
                    24
                ],
                "audio_out": 22,
                "mixer_id": 32,
                "type": "projector",
                "pri": 2,
                "title": "G1 Rear",
                "hide_audio": true
            },
            "VidConf_1": {
                "output": [
                    7,
                    9
                ],
                "no_audio": true,
                "no_mod": true,
                "type": "conference",
                "pri": 3,
                "title": "G1 VC"
            },
            "Display_3": {
                "screen": {
                    "module": "Screen_3",
                    "index": 1
                },
                "output": [
                    1,
                    21
                ],
                "audio_out": 23,
                "mixer_id": 107,
                "type": "projector",
                "pri": 4,
                "title": "G2 Front",
                "remote": true
            },
            "Display_4": {
                "screen": {
                    "module": "Screen_4",
                    "index": 1
                },
                "output": [
                    2,
                    22
                ],
                "audio_out": 24,
                "mixer_id": 106,
                "type": "projector",
                "pri": 5,
                "title": "G2 Rear",
                "remote": true
            },
            "VidConf_2": {
                "output": [
                    5
                ],
                "no_audio": true,
                "no_mod": true,
                "type": "conference",
                "pri": 6,
                "title": "G2 VC",
                "remote": true
            }
        },
        "blinds": [{
            "title": "Shades",
            "module": "DigitalIO_1",
            "manual": true,
            "up": {
                "func": "toggle_group",
                "args": [1,34,false,"blackout_room"]
            },
            "stop": {
                "func": "toggle_group",
                "args": [1,33,false,"blackout_room"]
            },
            "down": {
                "func": "toggle_group",
                "args": [1,35,true,"blackout_room"]
            }
        },
        {
            "title": "Blackout",
            "module": "DigitalIO_1",
            "manual": true,
            "up": {
                "func": "toggle_group",
                "args": [1,34,false,"blackout_room"]
            },
            "down": {
                "func": "toggle_group",
                "args": [1,35,true,"blackout_room"]
            }
        }],
        "light_level": "Off",
        "lighting_group": 10,
        "lights": {
            "levels": [
                {
                    "name": "Full",
                    "trigger": 3
                },
                {
                    "name": "Presentation",
                    "trigger": 2
                },
                {
                    "name": "Off",
                    "trigger": 1
                }
            ],
            "default": 3,
            "shutdown": 0,
            "present": 2
        },
        "lights_events": {
            "presets": [
                {
                    "name": "Party",
                    "trigger": 3
                },
                {
                    "name": "Lecture",
                    "trigger": 2
                },
                {
                    "name": "Off",
                    "trigger": 1
                }
            ],
            "faders": [{
                "name": "Spotlight 1",
                "id": 12,
                "min": 0,
                "max": 120
            },{
                "name": "Left Bank",
                "id": 13
            },{
                "name": "Right Bank",
                "id": 14
            }],
            "fader_min": 20,
            "fader_max": 80
            //
        },
        "vol_max": 3,
        "vol_min": -50,
        // module_name, modules index, fader_id, fader_index (optional)
        // (optional) fader_mute_id, fader_mute_index (optional)
        // ${fader_id}_${fader_index} == number
        // ${fader_id}_${fader_index}_mute == true/false
        "mics": [{
            name: "Wireless Mic",
            id: 222,
            index: 1
        }, {
            name: "Handheld Mic",
            id: 333,
            index: 1
        }],
        $lights_to: function (level: any) {
            this.light_level = level;
        },
        "pc_control": true
    }],
    Mixer: [{
        fader106_1: 1,
        fader107_1: 2,
        fader105_1: 3,
        fader32_1: -30,
        fader107_1_mute: true,
        fader222_1: 3,
        fader333_1: 3,
        $fader: function (fader: any, volume: any, index: any) {
            index = index || 1;
            this['fader' + fader + '_' + index] = volume;
        },
        $mute: function (fader: any, mute: any, index: any) {
            index = index || 1;
            this['fader' + fader + '_' + index + '_mute'] = mute;
        }
    }],
    Switcher: [{
        video3: 1,
        audio3: 3,
        video4: 6,
        audio4: 14,
        video5: 5,
        audio5: 2,
        video7: 9,
        audio7: 11,
        switch: function(map: any) {
            let keys = Object.keys(map);
            this['video' + map[keys[0]]] = keys[0];
        },
        switch_video: function(map: any) {
            let keys = Object.keys(map);
            this['video' + map[keys[0]]] = keys[0];
        },
        switch_audio: function(map: any) {
            let keys = Object.keys(map);
            this['audio' + map[keys[0]]] = keys[0];
        }
    }],
    Lighting: [{
        area12_level: 100,
        area13_level: 40,
        area14_level: 67,
        $light_level: function (id: number, level: number) {
            this['area' + id + '_level'] = level;
        },
        $trigger: function (area:number, trigger:number) {

        }
    }],
    Computer: [{}, {connected: false}, {}, {}],
    Camera: [{
        joy_right: 0x99,
        joy_left: 0x1,
        joy_center: 0x50,
        zoom: 25
    }, {
        joy_right: 0x99,
        joy_left: 0x1,
        joy_center: 0x50,
        zoom: 1
    }, {
        joy_right: 0x99,
        joy_left: 0x1,
        joy_center: 0x50,
        zoom: 75
    }, {
        joy_right: 0x99,
        joy_left: 0x1,
        joy_center: 0x50,
        zoom: 10
    }],
    Display: [
        {
            volume: 20,
            audio_mute: false,
            volume_min: -20,
            volume_max: 30,
            power: false,
            $power: function (state: boolean) {
                this.power = state;
            },
            $audio_mute: function (state: boolean) {
                this.audio_mute = state;
            }
        },
        {
            volume: 99,
            audio_mute: false,
            volume_min: 40,
            volume_max: 100,
            power: false,
            $power: function (state: boolean) {
                this.power = state;
            },
            $audio_mute: function (state: boolean) {
                this.audio_mute = state;
            }
        },
        {
            volume: 92,
            audio_mute: true,
            volume_min: 90,
            volume_max: 100,
            power: false,
            $power: function (state: boolean) {
                this.power = state;
            },
            $audio_mute: function (state: boolean) {
                this.audio_mute = state;
            }
        },
        {
            volume: 92,
            audio_mute: true,
            volume_min: 90,
            volume_max: 100,
            power: false,
            $power: function (state: boolean) {
                this.power = state;
            },
            $audio_mute: function (state: boolean) {
                this.audio_mute = state;
            }
        },
        {
            volume: 92,
            audio_mute: true,
            volume_min: 90,
            volume_max: 100,
            power: false,
            $power: function (state: boolean) {
                this.power = state;
            },
            $audio_mute: function (state: boolean) {
                this.audio_mute = state;
            }
        }
    ],
    DigitalIO: [{
        toggle_group(i:number, k:number, active: boolean, room: string) {

        }
    }]
};

window['systemData']['sys-B5'] = window['control']['systems']['sys-B5'];
