using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace webApi.Controllers
{
    public class UserController : Controller
    {

        string connStr = ConfigurationManager.ConnectionStrings["connStr"].ConnectionString;
        SqlConnection conn = null;
        SqlCommand cmd = null;
        SqlDataReader sdr = null;

        // public IEnumerable<Models.User> UsersList =new List<Models.User> {};
        public List<Models.User> UsersList = new List<Models.User> { };
        // GET: User
        public ActionResult Index()
        {
            sdr = GetData();
            int uid = 0;
            string name = "";
            //IDictionary<int, string> nameList = new Dictionary<int, string>();

            //List<Models.User> Users = new List<User>();
            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }
            try
            {
                while (sdr.Read())
                {
                    uid = int.Parse(sdr["Id"].ToString());
                    name = sdr["Name"].ToString();
                    var user = new Models.User();
                    user.Id = uid;
                    user.Name = name;
                    UsersList.Add(user);

                }
            }
            catch (SqlException ex)
            {
                Response.Write("<script> var ex = " + ex.ToString() + "; alert(ex);</script>");
            }
            finally
            {
                if (conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
            }


            JsonResult json = new JsonResult { Data = new { UsreName = "zzy", UserId = 123 } };
            //构建viewbag
            ViewBag.Title = "用户信息表";
            ViewBag.ProjectName = "Blog";

            ViewBag.UsersList = UsersList;

            return View();
        }

        // GET: User/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: User/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: User/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: User/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: User/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: User/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: User/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }


        /// <summary>
        ///  构造测试数据
        /// </summary>
        /// <returns></returns>
        public SqlDataReader GetData()
        {
            conn = new SqlConnection(connStr);
            string sql = "select * from Tb_User";
            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }
            try
            {
                cmd = new SqlCommand(sql, conn);
                sdr = cmd.ExecuteReader();
            }
            catch (SqlException ex)
            {
                Response.Write("<script> var ex = " + ex.ToString() + "; alert(ex);</script>");
            }
            return sdr;
        }
    }
}
