import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Switch } from "@mui/material";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import SearchBox from "../Utility/SearchBox";
import { useSelector, useDispatch } from "react-redux";
import { DashboardBox, DashboardTable } from "../Utility/DashboardBox";
import { SetBlogObj, BlogDelete, BlogGet } from "../../redux/actions/Blog/Blog.actions";
import { generateFilePath } from "../Utility/utils";
function Blog() {
  const dispatch = useDispatch();
    const blogArr = useSelector((blog) => blog.blog.blogs);
    const blogObj = useSelector((blog) => blog.blog.blogObj);
    const [displayBlogArr, setDisplayBlogArr] = useState([]);
    const [query, setQuery] = useState("");
    const [blogMainArr, setBlogMainArr] = useState([]);

    useEffect(() => {
        handleGet()
    }, [])



    const handleCategoryEdit = (row) => {
        dispatch(SetBlogObj(row));
    };


    const handleGet = () => {
        dispatch(BlogGet());
    };

    const handleCategoryDelete = (row) => {
        dispatch(BlogDelete(row._id))
    }


    useEffect(() => {
        console.log(blogArr, "hsuidfsaiufagsdifgifuayfiutfgitiu")

        setBlogMainArr(blogArr)
        setDisplayBlogArr(blogArr)

    }, [blogArr])
  const blog_columns = [
    {
      name: "SL",
      selector: (row,index) => index+1,
      sortable: true,
      width:'10%'
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Author",
      selector: (row) => row.author,
    },
    // {
    //   name: "Is Approved",
    //   grow: 0,
    //   cell: () => <Switch defaultChecked />,
    // },
    {
      name: "Action",
      minWidth: "210px",
      maxWidth: "211px",
      cell: (row) => <ActionIcon Uniquekey={row._id} remove edit deletePath="/Blog/post" onDeleteClick={() => handleCategoryDelete(row)} isRedirected={true} onEditClick={() => handleCategoryEdit(row)} editPath="/Blog/post/create" />,
  },
  ];
  const blog_data = [
    {
      id: "1",
      Seq: "1",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "2",
      Seq: "2",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "3",
      Seq: "3",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "4",
      Seq: "4",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "5",
      Seq: "5",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "6",
      Seq: "6",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "7",
      Seq: "7",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "8",
      Seq: "8",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "9",
      Seq: "9",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "10",
      Seq: "10",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
  ];

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="blue-1 m-0">Blog List</h5>
                <div className="d-flex gap-3">
                  <CustomButton
                    isLink
                    iconName="fa-solid fa-plus"
                    btnName="ADD NEW BLOG"
                    path="/Blog/post/create"
                  />
                  <SearchBox extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable columns={blog_columns} data={blogArr && blogArr.length > 0 ? blogArr : []} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Blog;
