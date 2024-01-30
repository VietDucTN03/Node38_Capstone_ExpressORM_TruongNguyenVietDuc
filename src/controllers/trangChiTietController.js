import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { Sequelize } from "sequelize";

const conn = initModels(sequelize);

// GET thông tin ảnh và người tạo ảnh
const getInfoByID = async (req, res) => {
    try {
        let {imageID} = req.params;
        let dataImage = await conn.hinh_anh.findOne({
            where: {
                hinh_id: imageID
            }
        });

        if (dataImage) {
            let userID = dataImage.nguoi_dung_id
            let dataUser = await conn.nguoi_dung.findOne({
                where: {
                    nguoi_dung_id: userID
                }
            });
            res.send({dataImage, dataUser})
        }
        else {
            res.send("Image not define");
        }
    } catch (err) {
        res.send(`Error: ${err}`);
    }
}

// GET thông tin bình luận
const getInfoComment = async (req, res) => {
    try {
        let {imageID} = req.params;
        let checkImage = await conn.hinh_anh.findOne({
            where: {
                hinh_id: imageID
            }
        });
        if (checkImage) {
            let data = await conn.binh_luan.findAll({
                where: {
                    hinh_id: imageID
                }
            });
            res.send(data)
        } else {
            res.send("ID image not find")
        } 
    } catch (err) {
        res.send(`BE error: ${err}`);
        console.log(err);
    }
}

// GET thông tin đã lưu hình này chưa
const getInfoSaveImg = async (req, res) => {
    try {
        let {imageID} = req.params;
        let checkImage = await conn.hinh_anh.findOne({
            where: {
                hinh_id: imageID,
            }
        });
        if (checkImage) {
            let checkSaveImg = await conn.luu_anh.findOne({
                where: {
                    hinh_id: imageID,
                },
            });
            if (checkSaveImg) {
                res.send(checkSaveImg);
            } else {
                res.send("Image not save");
            }
        } else {
            res.send("Not find ID Image");
        }
    } catch (err) {
        res.send(`BE error: ${err}`);
    }
}

const postCommentAndImage = async (req, res) => {
    // try {
    //     const { imageID } = req.params;
    //     const { nguoi_dung_id, noi_dung } = req.body;

    //     // Check if the image exists
    //     const checkImage = await conn.hinh_anh.findOne({
    //         where: {
    //             hinh_id: imageID,
    //         }
    //     });

    //     if (checkImage) {
    //         // Create a new comment
    //         const newComment = await conn.binh_luan.create({
    //             nguoi_dung_id,
    //             hinh_id: imageID,
    //             ngay_binh_luan: new Date(),
    //             noi_dung,
    //         });

    //         res.send(newComment);
    //     } else {
    //         res.send("Image not found");
    //     }
    // } catch (err) {
    //     res.send(`BE error: ${err}`);
    // }
}

export {
    getInfoByID,
    getInfoComment,
    getInfoSaveImg,
    postCommentAndImage,
}