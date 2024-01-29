const tagsType = [
    "sovits",
    "diffusionsvc",
    "fishspeech",
    "ddsp",
    "gptsovits",
    "bertvits",
    "package"
]

const names = [
    "琴（风）",
    "安柏（火）",
    "丽莎（雷）",
    "凯亚（冰）",
    "芭芭拉（水）",
    "迪卢克（火）",
    "雷泽（雷）",
    "温蒂（风）",
    "可莉（火）",
    "班尼特（火）",
    "诺艾尔（岩）",
    "菲谢尔（雷）",
    "砂糖（风）",
    "莫娜（水）",
    "迪奥娜（冰）",
    "阿贝多（岩）",
    "罗莎莉亚（冰）",
    "优菈（冰）",
    "埃洛伊（冰）",
    "米卡（冰）",
]

const single = () => {
    var randTagsNum = Math.floor(Math.random() * tagsType.length)
    var randTags = []
    for (var i = 0; i < randTagsNum; i++) {
        randTags.push({
            type: tagsType[Math.floor(Math.random() * tagsType.length)],
            name: String(Math.floor(Math.random() * 1000000))
        })
    }

    var randName = names[Math.floor(Math.random() * names.length)]
    var randUUID = String(Math.floor(Math.random() * 1000000))
    return {
        uuid: randUUID,
        name: randName,
        tags: randTags
    }
}

const num = 400

const results = []

for (var i = 0; i < num; i++) {
    results.push(single())
}

import { writeFile } from 'fs'

writeFile('./src/models.json', JSON.stringify(results), (err) => {
    if (err) {
        console.log(err)
    }
    console.log('success')
})
