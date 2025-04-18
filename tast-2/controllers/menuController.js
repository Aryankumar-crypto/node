// import { menuModel } from "../models.js";
import { menuItemModel } from "#@/models/MenuItem";

export const createMenuItem = async (req, res, next) => {
    try {
        const { name, parentId = null, children = [] } = req.body;
        const newMenu = new menuItemModel({
            name,
            parentId,
            children,
        });
        const menuSaved = await newMenu.save();
        res.json(menuSaved);
    } catch (error) {
        res.json({ error: err.message });
    }
};

export const getMenu = async (req, res, next) => {
    try {
        const menus = await menuItemModel

            .find()
            .populate({path:"children", select:"_id name"})
            .populate({path:"parentId", select:"_id name"})
            // .populate("parentId");
        res.status(200).json(menus);
    } catch (err) {
        resjson({ error: err.message });
    }
};

export const editMenuItem = async (req, res, next) => {
    try {
        const { menuId } = req.query;
        const { children = [] } = req.body;

        const parentMenu = await menuItemModel.findById(menuId);
        if (!parentMenu) {
            return res.status(404).json({ error: "Menu not found" });
        }

        // 1. Remove parentId from all previous children
        await menuItemModel.updateMany(
            { parentId: parentMenu._id },
            { $set: { parentId: null } }
        );

        // 2. Clear current children from others’ children arrays
        await menuItemModel.updateMany(
            { children: parentMenu._id },
            { $pull: { children: parentMenu._id } }
        );

        // 3. Update new children’s parentId to parentMenu._id
        await menuItemModel.updateMany(
            { _id: { $in: children } },
            { $set: { parentId: parentMenu._id } }
        );

        // 4. Update parentMenu's children array
        // parentMenu.children = children;
        // await parentMenu.save();
        
         // 4. Update parentMenu's children array  
        await menuItemModel.updateMany(
            {children:parentMenu._id},
            {$set : {children:[]}}
        )

        res.status(200).json({
            message: "Parent and children updated successfully.",
            parentMenu,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
