import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import RTE from "../RTE";
import Select from "../Select";
import Config from "../../config/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dbService from '../../backend/database/db';

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await dbService.uploadFile(data.image[0]) : null
      if (file) {
        dbService.deleteFile(post.featuredImage)
      }
      const dbPost = await dbService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined
      })      
      if(dbPost) navigate(`/post/${dbPost.$id}`);
    }else{
      const file = await dbService.uploadFile(data.image[0])
      if (file) {
        const fileId = file.$id
        data.featuredImage = fileId
        const dbPost = await dbService.createPost({ ...data, userId: userData.$id })

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    return value
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }, []);

  useEffect(() => {
    watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });
  }, [watch, slugTransform, setValue]);

  return (
    <form className="flex flex-wrap" onSubmit={handleSubmit(submit)}>
      <div className="w-2/3 px-2">
        <Input
          label="Title"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug : "
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.target.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
         label="Content : "
         name = "content"
         control = {control}
         defaultValue={getValues("content")}
        />
      </div>
      <div className="1/3 px-2">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img src={dbService  .getFilePreview(post.featuredImage)} alt={post.title}
              className="rounded-lg"
            />

          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >{post ? "Update" : "Submit"}</Button>
      </div>
    </form>
  );
}

export default PostForm;
