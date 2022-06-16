using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DAO
{
    public class ConnectionLib
    {
        public static bool CnnStatus = true;
        public static string ConnectString = ConfigurationManager.ConnectionStrings["LibDbContext"].ToString();

        public static void ExecSQL(SqlCommand _cmd)
        {
            using (SqlConnection _conn = new SqlConnection(ConnectString))
            {
                _conn.Open();
                _cmd.Connection = _conn;
                //_cmd.Parameters.AddWithValue("@MaDonViSuDung", MaDonViSuDung);
                if (_conn.State == ConnectionState.Open)
                {
                    _cmd.ExecuteNonQuery();
                }
                else
                {
                    _cmd.ExecuteNonQuery();
                }
            }
        }

        public static int ExecSQLID(SqlCommand _cmd)
        {
            using (SqlConnection _conn = new SqlConnection(ConnectString))
            {
                _conn.Open();
                _cmd.Connection = _conn;
                return (int)_cmd.ExecuteScalar();
            }
        }

        public static DataTable ExecSQLDT(SqlCommand _cmd)
        {
            using (SqlConnection _conn = new SqlConnection(ConnectString))
            {
                _conn.Open();
                SqlDataAdapter da = new SqlDataAdapter();
                _cmd.Connection = _conn;
                da.SelectCommand = _cmd;
                DataTable dt = new DataTable();
                da.Fill(dt);
                return dt;
            }
        }

        public static DataSet ExecSQLDS(SqlCommand _cmd)
        {
            using (SqlConnection _conn = new SqlConnection(ConnectString))
            {
                SqlDataAdapter da = new SqlDataAdapter();
                _cmd.Connection = _conn;
                da.SelectCommand = _cmd;
                DataSet dsDataSet = new DataSet();
                da.Fill(dsDataSet);
                return dsDataSet;
            }
        }
    }
}
