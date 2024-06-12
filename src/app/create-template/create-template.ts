export interface Template {
    x: number;
    y: number;
    content: string;
    name: string;
    width: number;
    height: number;
    color: string;
    align: string;
    hidden: boolean;
    type: TypeTemplate,
    url?: string;
    id: string;
    fontSize: number,
    background: string,
    rotate: number;
    padding: number;
    borderRadius: number;
    zIndex: number,
    checkInOptions: TemplateCheckIn;
    idGroup: string;
    fontWeight: string;
    fontFamily: string
}

export interface TemplateGroup {
    id: string;
    data: Template[];
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    hidden: boolean;
    zIndex: number
}

export interface TemplateCheckIn {
    activeType: checkInState,
    notFound: {
        content: string;
        name: string;
        color: string;
        hidden: boolean;
        type: TypeTemplate,
        url?: string;
        fontSize: number,
        background: string,
        rotate: number;
        padding: number;
        borderRadius: number;
        zIndex: number,
        width: number;
        height: number;
        align: string;
        fontWeight: string;
        fontFamily: string;
    },
    checkedIn: {
        content: string;
        name: string;
        color: string;
        hidden: boolean;
        type: TypeTemplate,
        url?: string;
        fontSize: number,
        background: string,
        rotate: number;
        padding: number;
        borderRadius: number;
        zIndex: number,
        width: number;
        height: number;
        align: string;
        fontWeight: string;
        fontFamily: string;
    },
    checkIn: {
        content: string;
        name: string;
        color: string;
        hidden: boolean;
        type: TypeTemplate,
        url?: string;
        fontSize: number,
        background: string,
        rotate: number;
        padding: number;
        borderRadius: number;
        zIndex: number;
        width: number;
        height: number;
        align: string;
        fontWeight: string;
        fontFamily: string;
    }
}

export interface CheckInOptions {
    width: number,
    background: string,
    height: number
    notFound: any,
    checkIn: any,
    checkedIn: any,
    zIndex: number,
    activeType: checkInState
}

export class TemplateGroup implements TemplateGroup {
    constructor(name: string) {
        this.id = ObjectId();
        this.name = name;
        this.data = [];
        this.x = 10;
        this.y = 10;
        this.width = 100;
        this.height = 100;
        this.hidden = false;
        this.zIndex = 0
    }

    clone() {
        const cloned = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        Object.setPrototypeOf(cloned, this.constructor.prototype);
        return cloned;
    }

    convertType(template: any) {
        const cloned = Object.assign(this, template);
        Object.setPrototypeOf(cloned, this.constructor.prototype);
        return cloned;
    }
}

export const FontFamily = [
    '"Times New Roman", Times, serif',
    'Georgia, serif',
    'Garamond, serif',
    'Arial, Helvetica, sans-serif',
    'Tahoma, Verdana, sans-serif',
    '"Trebuchet MS", Helvetica, sans-serif',
    'Geneva, Verdana, sans-serif',
    '"Courier New", Courier, monospace',
    '"Brush Script MT", cursive',
    'Copperplate, Papyrus, fantasy',
    'Gill Sans MT Pro'
]

export class Template implements Template {
    constructor(name: string, pos: number, idGroup?: string) {
        this.x = pos;
        this.y = pos;
        this.content = name;
        this.name = name;
        this.width = 120;
        this.height = 120;
        this.color = '#ffffff';
        this.align = TypeAlign.LEFT;
        this.hidden = false;
        this.type = TypeTemplate.TEXT;
        this.id = ObjectId();
        this.fontSize = 14;
        this.background = 'transparent';
        this.rotate = 0;
        this.padding = 0;
        this.borderRadius = 0;
        this.url = '';
        this.zIndex = 0;
        this.fontWeight = '400';
        this.fontFamily = ''
        if (idGroup) {
            this.zIndex = 1;
            this.idGroup = idGroup
        }
        this.checkInOptions = {
            activeType: checkInState.ERROR,
            notFound: {
                align: 'left',
                content: 'not found',
                name: '',
                color: '#ffffff',
                hidden: false,
                type: TypeTemplate.TEXT,
                url: '',
                fontSize: 14,
                background: 'transparent',
                rotate: 0,
                padding: 0,
                borderRadius: 0,
                zIndex: 0,
                width: 100,
                height: 100,
                fontWeight: '400',
                fontFamily: ''
            },
            checkedIn: {
                align: 'left',
                content: 'not found',
                name: '',
                color: '#ffffff',
                hidden: false,
                type: TypeTemplate.TEXT,
                url: '',
                fontSize: 14,
                background: 'transparent',
                rotate: 0,
                padding: 0,
                borderRadius: 0,
                zIndex: 0,
                width: 100,
                height: 100,
                fontWeight: '400',
                fontFamily: ''
            },
            checkIn: {
                align: 'left',
                content: 'not found',
                name: '',
                color: '#ffffff',
                hidden: false,
                type: TypeTemplate.TEXT,
                url: '',
                fontSize: 14,
                background: 'transparent',
                rotate: 0,
                padding: 0,
                borderRadius: 0,
                zIndex: 0,
                width: 100,
                height: 100,
                fontWeight: '400',
                fontFamily: ''
            }
        }
    }

    clone() {
        const cloned = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        Object.setPrototypeOf(cloned, this.constructor.prototype);
        return cloned;
    }

    convertType(template: any) {
        const cloned = Object.assign(this, template);
        Object.setPrototypeOf(cloned, this.constructor.prototype);
        return cloned;
    }
}

export enum checkInState {
    ERROR = 'notFound',
    CHECKED = 'checkedIn',
    CHECKIN = 'checkIn'
}

export function ObjectId(m = Math, d = Date, h = 16, s = (sELe: any) => m.floor(sELe).toString(h)) {
    return s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
}

export interface BackgroundTemplate {
    url: string,
    name: string,
    scale: string
}

export class BackgroundTemplate implements BackgroundTemplate {
    constructor() {
        this.name = 'background';
        this.url = '';
        this.scale = TypeScreen.PC
    }
}

export const apiUrl = {
    origin: 'https://api.dev.qrclc.com',
    uploadImg: '/static/upload',
    static: '/static/',
    update: '/api/template/update',
    get: '/api/template/get',
    updateEvent: '/api/event/update'
}

export enum TypeTemplate {
    TEXT = 'text',
    IMAGE = 'img',
    BACKGROUND = 'background',
    CHECK_IN = 'check in'
}

export enum TypeAction {
    CHANGE = 'change',
    DELETE = 'delete',
    COPY = 'copy'
}


export enum TypeAlign {
    CENTER = 'center',
    RIGHT = 'right',
    LEFT = 'left'
}

export enum TypeScreen {
    PC = '16/9',
    MOBILE = '9/18',
    PC_HORIZION = '9/16',
    AlMAZ = '424/707'
}

export const FontWeight = [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    'bold',
    'lighter',
]

export const sampleTemplateValue = [
    {
        "name": "group 1",
        "data": [
            {
                "x": 6.479999999999997,
                "y": 6.779999999999999,
                "content": "ele 1 (group 1)",
                "name": "ele 1 (group 1)",
                "width": 120,
                "height": 120,
                "color": "#ffffff",
                "align": "left",
                "hidden": false,
                "type": "check in",
                "fontSize": 14,
                "background": "transparent",
                "rotate": 0,
                "padding": 0,
                "borderRadius": 0,
                "url": "",
                "zIndex": 1,
                "fontWeight": "400",
                "fontFamily": "",
                "checkInOptions": {
                    "activeType": "checkIn",
                    "checkIn": {
                        "align": "left",
                        "background": "#ffffff",
                        "borderRadius": 72,
                        "color": "#ffffff",
                        "content": "not found",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 205,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "background",
                        "url": "",
                        "width": 451,
                        "zIndex": 0
                    },
                    "checkedIn": {
                        "align": "left",
                        "background": "#ffffff",
                        "borderRadius": 72,
                        "color": "#ffffff",
                        "content": "not found",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 206,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "background",
                        "url": "",
                        "width": 472,
                        "zIndex": 0
                    },
                    "notFound": {
                        "align": "left",
                        "background": "#ffffff",
                        "borderRadius": 72,
                        "color": "#ffffff",
                        "content": "not found",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 207,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "background",
                        "url": "",
                        "width": 480,
                        "zIndex": 0
                    }
                },
            },
            {
                "x": 18.07,
                "y": 21.710000000000004,
                "content": "ele 2 (group 1)",
                "name": "ele 2 (group 1)",
                "width": 120,
                "height": 120,
                "color": "#ffffff",
                "align": "left",
                "hidden": false,
                "type": "check in",
                "fontSize": 14,
                "background": "transparent",
                "rotate": 0,
                "padding": 0,
                "borderRadius": 0,
                "url": "",
                "zIndex": 1,
                "fontWeight": "400",
                "fontFamily": "",
                "checkInOptions": {
                    "activeType": "checkIn",
                    "checkIn": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#ffffff",
                        "content": "not found",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 80,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "img",
                        "url": "https://api.dev.qrclc.com/static/001-success_urs_cga6gsa23aks73c3536g2023-06-11 02:51:18.221082946 +0700 +07.png",
                        "width": 77,
                        "zIndex": 0
                    },
                    "checkedIn": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#ffffff",
                        "content": "not found",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 80,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "img",
                        "url": "https://api.dev.qrclc.com/static/003-info_urs_cga6gsa23aks73c3536g2023-06-11 02:51:13.350299478 +0700 +07.png",
                        "width": 77,
                        "zIndex": 0
                    },
                    "notFound": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#ffffff",
                        "content": "not found",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 80,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "img",
                        "url": "https://api.dev.qrclc.com/static/002-error_urs_cga6gsa23aks73c3536g2023-06-11 02:51:05.79854861 +0700 +07.png",
                        "width": 77,
                        "zIndex": 0
                    }
                },
            },
            {
                "x": 21.39,
                "y": 75.04,
                "content": "{{time_checkin}}",
                "name": "ele 3 (group 1)",
                "width": 98,
                "height": 123,
                "color": "#000000",
                "align": "left",
                "hidden": false,
                "type": "check in",
                "fontSize": 12,
                "background": "transparent",
                "rotate": 0,
                "padding": 0,
                "borderRadius": 0,
                "url": "",
                "zIndex": 1,
                "fontWeight": "400",
                "fontFamily": "",
                "checkInOptions": {
                    "activeType": "checkIn",
                    "checkIn": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "{{time_checkin}}",
                        "fontFamily": "",
                        "fontSize": 10,
                        "fontWeight": "400",
                        "height": 98,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 142,
                        "zIndex": 0
                    },
                    "checkedIn": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "{{time_checkin}}",
                        "fontFamily": "",
                        "fontSize": 10,
                        "fontWeight": "400",
                        "height": 98,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 142,
                        "zIndex": 0
                    },
                    "notFound": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "{{time_checkin}}",
                        "fontFamily": "",
                        "fontSize": 10,
                        "fontWeight": "400",
                        "height": 98,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 142,
                        "zIndex": 0
                    }
                },
            },
            {
                "x": 14.65,
                "y": 75.04,
                "content": "ele 4 (group 1)",
                "name": "ele 4 (group 1)",
                "width": 120,
                "height": 120,
                "color": "#ffffff",
                "align": "left",
                "hidden": false,
                "type": "check in",
                "fontSize": 14,
                "background": "transparent",
                "rotate": 0,
                "padding": 0,
                "borderRadius": 0,
                "url": "",
                "zIndex": 1,
                "fontWeight": "400",
                "fontFamily": "",
                "checkInOptions": {
                    "activeType": "checkIn",
                    "checkIn": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "Time:",
                        "fontFamily": "",
                        "fontSize": 10,
                        "fontWeight": "400",
                        "height": 103,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 37,
                        "zIndex": 0
                    },
                    "checkedIn": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "Time:",
                        "fontFamily": "",
                        "fontSize": 10,
                        "fontWeight": "400",
                        "height": 103,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 37,
                        "zIndex": 0
                    },
                    "notFound": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "Time:",
                        "fontFamily": "",
                        "fontSize": 10,
                        "fontWeight": "400",
                        "height": 103,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 37,
                        "zIndex": 0
                    }
                },
            },
            {
                "x": 16.259999999999998,
                "y": 55.77000000000001,
                "content": "ele 5 (group 1)",
                "name": "ele 5 (group 1)",
                "width": 120,
                "height": 120,
                "color": "#ffffff",
                "align": "left",
                "hidden": false,
                "type": "check in",
                "fontSize": 14,
                "background": "transparent",
                "rotate": 0,
                "padding": 0,
                "borderRadius": 0,
                "url": "",
                "zIndex": 1,
                "fontWeight": "400",
                "fontFamily": "",
                "checkInOptions": {
                    "activeType": "checkIn",
                    "checkIn": {
                        "align": "center",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#25ae88",
                        "content": "Check in\nthành công",
                        "fontFamily": "",
                        "fontSize": 16,
                        "fontWeight": "bold",
                        "height": 100,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 100,
                        "zIndex": 0
                    },
                    "checkedIn": {
                        "align": "center",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#48a0dc",
                        "content": "Đã được\ncheck in",
                        "fontFamily": "",
                        "fontSize": 16,
                        "fontWeight": "bold",
                        "height": 100,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 100,
                        "zIndex": 0
                    },
                    "notFound": {
                        "align": "center",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#d75a4a",
                        "content": "Không có\ndữ liệu",
                        "fontFamily": "",
                        "fontSize": 16,
                        "fontWeight": "bold",
                        "height": 100,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 100,
                        "zIndex": 0
                    }
                },
            },
            {
                "x": 48.51,
                "y": 21.710000000000004,
                "content": "ele 6 (group 1)",
                "name": "ele 6 (group 1)",
                "width": 120,
                "height": 120,
                "color": "#ffffff",
                "align": "left",
                "hidden": false,
                "type": "check in",
                "fontSize": 14,
                "background": "transparent",
                "rotate": 0,
                "padding": 0,
                "borderRadius": 0,
                "url": "",
                "zIndex": 1,
                "fontWeight": "400",
                "fontFamily": "",
                "checkInOptions": {
                    "activeType": "checkIn",
                    "checkIn": {
                        "align": "center",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#25ae88",
                        "content": "Thông tin khách hàng",
                        "fontFamily": "",
                        "fontSize": 16,
                        "fontWeight": "bold",
                        "height": 89,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 172,
                        "zIndex": 0
                    },
                    "checkedIn": {
                        "align": "center",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#48a0dc",
                        "content": "Thông tin khách hàng",
                        "fontFamily": "",
                        "fontSize": 16,
                        "fontWeight": "bold",
                        "height": 89,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 172,
                        "zIndex": 0
                    },
                    "notFound": {
                        "align": "center",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#d75a4a",
                        "content": "Thông tin khách hàng",
                        "fontFamily": "",
                        "fontSize": 16,
                        "fontWeight": "bold",
                        "height": 89,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 172,
                        "zIndex": 0
                    }
                },
            },
            {
                "x": 42.58,
                "y": 38.10000000000001,
                "content": "ele 7 (group 1)",
                "name": "ele 7 (group 1)",
                "width": 118,
                "height": 120,
                "color": "#ffffff",
                "align": "left",
                "hidden": false,
                "type": "check in",
                "fontSize": 14,
                "background": "transparent",
                "rotate": 0,
                "padding": 0,
                "borderRadius": 0,
                "url": "",
                "zIndex": 1,
                "fontWeight": "400",
                "fontFamily": "",
                "checkInOptions": {
                    "activeType": "checkIn",
                    "checkIn": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "họ và tên:",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 103,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 64,
                        "zIndex": 0
                    },
                    "checkedIn": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "họ và tên:",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 103,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 64,
                        "zIndex": 0
                    },
                    "notFound": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "họ và tên:",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 103,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 64,
                        "zIndex": 0
                    }
                },
            },
            {
                "x": 55.23,
                "y": 38.10000000000001,
                "content": "ele 8 (group 1)",
                "name": "ele 8 (group 1)",
                "width": 120,
                "height": 120,
                "color": "#ffffff",
                "align": "left",
                "hidden": false,
                "type": "check in",
                "fontSize": 14,
                "background": "transparent",
                "rotate": 0,
                "padding": 0,
                "borderRadius": 0,
                "url": "",
                "zIndex": 1,
                "fontWeight": "400",
                "fontFamily": "",
                "checkInOptions": {
                    "activeType": "checkIn",
                    "checkIn": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "Nguyễn Văn Tét",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 102,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 159,
                        "zIndex": 0
                    },
                    "checkedIn": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "Nguyễn Văn Tét",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 102,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 159,
                        "zIndex": 0
                    },
                    "notFound": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "Nguyễn Văn Tét",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 102,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 159,
                        "zIndex": 0
                    }
                },
            },
            {
                "x": 42.58,
                "y": 63.58,
                "content": "ele 9 (group 1)",
                "name": "ele 9 (group 1)",
                "width": 120,
                "height": 120,
                "color": "#ffffff",
                "align": "left",
                "hidden": false,
                "type": "check in",
                "fontSize": 14,
                "background": "transparent",
                "rotate": 0,
                "padding": 0,
                "borderRadius": 0,
                "url": "",
                "zIndex": 1,
                "fontWeight": "400",
                "fontFamily": "",
                "checkInOptions": {
                    "activeType": "checkIn",
                    "checkIn": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "Địa chỉ:",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 99,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 65,
                        "zIndex": 0
                    },
                    "checkedIn": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "Địa chỉ:",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 99,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 65,
                        "zIndex": 0
                    },
                    "notFound": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "Địa chỉ:",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 99,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 65,
                        "zIndex": 0
                    }
                },
            },
            {
                "x": 55.55,
                "y": 63.58,
                "content": "ele 10 (group 1)",
                "name": "ele 10 (group 1)",
                "width": 120,
                "height": 120,
                "color": "#ffffff",
                "align": "left",
                "hidden": false,
                "type": "check in",
                "fontSize": 14,
                "background": "transparent",
                "rotate": 0,
                "padding": 0,
                "borderRadius": 0,
                "url": "",
                "zIndex": 1,
                "fontWeight": "400",
                "fontFamily": "",
                "checkInOptions": {
                    "activeType": "checkIn",
                    "checkIn": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "182 Lương Thế Vinh",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 100,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 159,
                        "zIndex": 0
                    },
                    "checkedIn": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "182 Lương Thế Vinh",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 100,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 159,
                        "zIndex": 0
                    },
                    "notFound": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "182 Lương Thế Vinh",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 103,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 167,
                        "zIndex": 0
                    }
                },
            },
            {
                "x": 42.58,
                "y": 50.9,
                "content": "ele 11 (group 1)",
                "name": "ele 11 (group 1)",
                "width": 120,
                "height": 120,
                "color": "#ffffff",
                "align": "left",
                "hidden": false,
                "type": "check in",
                "fontSize": 14,
                "background": "transparent",
                "rotate": 0,
                "padding": 0,
                "borderRadius": 0,
                "url": "",
                "zIndex": 1,
                "fontWeight": "400",
                "fontFamily": "",
                "checkInOptions": {
                    "activeType": "checkIn",
                    "checkIn": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "params:",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 102,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 64,
                        "zIndex": 0
                    },
                    "checkedIn": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "params:",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 102,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 64,
                        "zIndex": 0
                    },
                    "notFound": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "params:",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 102,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 64,
                        "zIndex": 0
                    }
                },
            },
            {
                "x": 55.23,
                "y": 50.9,
                "content": "ele 12 (group 1)",
                "name": "ele 12 (group 1)",
                "width": 120,
                "height": 120,
                "color": "#ffffff",
                "align": "left",
                "hidden": false,
                "type": "check in",
                "fontSize": 14,
                "background": "transparent",
                "rotate": 0,
                "padding": 0,
                "borderRadius": 0,
                "url": "",
                "zIndex": 1,
                "fontWeight": "400",
                "fontFamily": "",
                "checkInOptions": {
                    "activeType": "checkIn",
                    "checkIn": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "0123456789",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 95,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 159,
                        "zIndex": 0
                    },
                    "checkedIn": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "0123456789",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 95,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 159,
                        "zIndex": 0
                    },
                    "notFound": {
                        "align": "left",
                        "background": "transparent",
                        "borderRadius": 0,
                        "color": "#000000",
                        "content": "0123456789",
                        "fontFamily": "",
                        "fontSize": 14,
                        "fontWeight": "400",
                        "height": 95,
                        "hidden": false,
                        "name": "",
                        "padding": 0,
                        "rotate": 0,
                        "type": "text",
                        "url": "",
                        "width": 159,
                        "zIndex": 0
                    }
                },
            }
        ],
        "x": 18,
        "y": 23,
        "width": 523.95,
        "height": 244.21,
        "hidden": false,
        "zIndex": 0
    }
]

export const sampleTemplate = [
    {
        name: 'Form thông tin',
        value: 0
    }
]