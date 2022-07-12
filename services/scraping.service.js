//services/scraping.service.js
// export const getJsonData = async (query) => {
//   try {
//      return { message: 'ok' };
//   } catch (e) {
//     throw Error("Error while getting HTML.");
//   }
// };


// services/scraping.service.js
import axios from "axios";

export const getJsonData = async (query) => {
  try {
    const url = "https://gsacademy.jp/about/";
    const html = (await axios.get(url)).data;
    //   return html;
      
    //改行などを取り除く
    //スラッシュで囲むreplaceAllの場合はgが必須,
    //空白を取り除くとタグの中身の空白も無くなってしまうため不都合が生じる
    const minimizedHtml = html.replaceAll(/\n|\r|\t/g, "");     
    //   return minimizedHtml;  
    
    //日本語のクレド
    const textJa = minimizedHtml.match(
      /(?<=<\/figure><p>)[\s\S]+?(?=<\/p><\/div>)/g
    );
    // return textJa;
    
    //英語のクレド
    const textEn = minimizedHtml.match(
      /(?<=png" alt=")[\s\S]+?(?=" class="-of -cover lazyload"><\/figure)/g
    )
       .map((x) => x.replaceAll(/&quot;/g, "'"));  //余計なものを取り除く
    // return textEn;
      
    //イメージファイル
    const imgUrl = minimizedHtml.match(
      /\/uploads\/about_credo_0[1-7]\.png/g
    )
    .map((x) => `https://gsacademy.jp${x}`);  
    //   return imgUrl;
      
    //データをまとめる
    const credoJson = [...new Array(7)].map((x, i) => ({
      credo_no: i + 1,
      text_ja: textJa[i],
      text_en: textEn[i],
      img_url: imgUrl[i],
    }));

    return credoJson;  
    
      
  } catch (e) {
    throw Error(e);
  }
};
