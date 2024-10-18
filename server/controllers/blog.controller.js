import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";
import blog from "../models/blog.model";
import blogCategory from "../models/blogCategory.model";
import Users from "../models/user.model";
import { ErrorMessages, rolesObj } from "../helpers/Constants";
import Category from "../models/category.model";

export const addBlog = async (req, res, next) => {
  try {
    // let validityCheck = await Users.findOne({
    //     $or: [{ _id: req.user.userId, role: "ADMIN" },
    //         { _id: req.user.userId, role: "SUBADMIN" }
    //     ]
    // }).exec()
    // if (!validityCheck) throw new Error("you are not authorise to add Blog");

    let ExistCheck = await blog
      .findOne({
        $or: [
          { title: new RegExp(`^${req.body.title}$`) },
          { slug: new RegExp(`^${req.body.slug}$`) },
        ],
      })
      .exec();
    if (ExistCheck)
      throw new Error(
        `${ErrorMessages.TITLE_EXISTS} or ${ErrorMessages.SLUG_EXISTS}`
      );

    if (req.body.image) {
      req.body.image = await storeFileAndReturnNameBase64(req.body.image);
    }
    if (req.body.blogCategoryId) {
      let find = await blogCategory
        .findOne({ _id: req.body.blogCategoryId })
        .exec();
      if (!find) throw { status: 400, message: "category not exist " };
    }
    if (req.body.title && !req.body?.slug) {
      const slugify = req.body.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      req.body.slug = slugify;
    }
    // if (req.body.tagId) {
    //     let find = await tag.findOne({ _id: req.body.tagId }).exec()
    //     if (!find) throw { status: 400, message: "tag not exist " };
    // };
    let obj = {
      title: req.body.title,
      slug: req.body.slug,
      blogCategoryId: req.body.blogCategoryId,
      author: req.body.author,
      description: req.body.description,
      image: req.body.image,
      read: req.body.read,
    };
    await blog(obj).save();
    res
      .status(201)
      .json({ message: "blog created successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export const getBlog = async (req, res, next) => {
  try {
    let get = {};
    let query = {};
    if (req.query?.read != undefined) {
      query["read"] = req.query?.read;
    }

    if (req.query?.blogCategoryId != undefined) {
      query["blogCategoryId"] = req.query?.blogCategoryId;
    }

    if (req.query.limit) {
      get = await blog
        .find(query)
        .limit(req.query.limit)
        .sort({ createdAt: -1 })
        .exec();
    } else {
      get = await blog.find(query).sort({ createdAt: -1 }).exec();
    }

    // console.log(get, "pp");
    res.status(200).json({ message: "get blog", data: get, success: true });
  } catch (err) {
    next(err);
  }
};

export const getBlogBySlug = async (req, res, next) => {
  // for user
  try {
    const blogObj = await blog.findOne({ slug: req.params.id }).exec();
    if (!blogObj) {
      throw new Error("Could not find hotel");
    }
    res.status(200).json({ message: "Blog", data: blogObj, success: true });
  } catch (err) {
    next(err);
  }
};

export const updateById = async (req, res, next) => {
  try {
    // let validityCheck = await Users.findOne({
    //     $or: [{ _id: req.user.userId, role: "ADMIN" },
    //         { _id: req.user.userId, role: "SUBADMIN" }
    //         // { _id: req.user.userId, role: "SELLER" },
    //     ]
    // }).exec()
    // if (!validityCheck) throw new Error("you are not authorise to update blog");

    let ExistCheck = await blog
      .findOne({
        $or: [
          { title: new RegExp(`^${req.body.title}$`) },
          { slug: new RegExp(`^${req.body.slug}$`) },
        ],
      })
      .exec();
    // if (ExistCheck) throw new Error(`${ErrorMessages.TITLE_EXISTS} or ${ErrorMessages.SLUG_EXISTS}`);

    if (req.body.image && `${req.body.image}`.includes("data:image")) {
      req.body.image = await storeFileAndReturnNameBase64(req.body.image);
    }
    if (req.body.blogCategoryId) {
      let find = await blogCategory
        .findOne({ _id: req.body.blogCategoryId })
        .exec();
      console.log(find, "findfind");
      if (!find) throw { status: 400, message: "blog category not exist " };
    }
    // if (req.body.tagId) {
    //     let find = await tag.findOne({ _id: req.body.tagId }).exec()
    //     if (!find) throw { status: 400, message: "tag not exist " };
    // };

    if (req.body.title && !req.body?.slug) {
      const slugify = req.body.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      req.body.slug = slugify;
    }
    let obj = {
      title: req.body.title || ExistCheck.title,
      slug: req.body.slug || ExistCheck.slug,
      author: req.body.author || ExistCheck.author,
      blogCategoryId: req.body.blogCategoryId || ExistCheck.blogCategoryId,
      description: req.body.description || ExistCheck.description,
      image: req.body.image || ExistCheck.image,
      read: req.body.read,
    };
    await blog.findByIdAndUpdate(req.params.id, obj, { new: true }).exec();
    if (!obj) throw { status: 400, message: "blog Not Found" };

    res.status(200).json({ message: "blog Updated", success: true });
  } catch (err) {
    next(err);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    // let validityCheck = await Users.findOne({
    //     $or: [{ _id: req.user.userId, role: "ADMIN" },
    //         { _id: req.user.userId, role: "SUBADMIN" }
    //     ]
    // }).exec();
    // if (!validityCheck) throw new Error("you are not authorise to delete blog");
    let Obj = await blog.findByIdAndDelete(req.params.id).exec();
    // console.log(Obj, "obj")
    if (!Obj)
      throw { status: 400, message: "blog not found or deleted already" };
    await blog.findByIdAndUpdate(req.params.id, { isDeleted: true }).exec();
    res.status(200).json({ msg: " blog deleted successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export const updateBlogStatus = async (req, res, next) => {
  //admin wants to update the 'isdeleted' false from true
  try {
    let validityCheck = await Users.findOne({
      $or: [
        { _id: req.user.userId, role: "ADMIN" },
        { _id: req.user.userId, role: "SUBADMIN" },
      ],
    }).exec();
    if (!validityCheck)
      throw new Error("you are not authorise to update the blog status");
    let Obj = await blog
      .findByIdAndUpdate(req.params.id, { isDeleted: false })
      .exec();
    if (!Obj) throw { status: 400, message: "blog not found" };

    res
      .status(200)
      .json({ msg: " blog status update successfully", success: true });
  } catch (err) {
    next(err);
  }
};
