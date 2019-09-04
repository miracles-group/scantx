﻿using Spec_Project.Models;
using System;
using Spec_Project.Entities;
using System.Linq;
using System.Collections.Generic;
using QRCoder;
using System.Drawing;
using System.Drawing.Text;
using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace Spec_Project.Services
{
    public interface IScanDataService
    {
        List<TblScanData> getScanData();
        ResponseModel addScanData(TblScanData tblscandata);
        ResponseModel DeleteScanData(string scanid);
        ResponseModel DeleteArrScanData(List<string> deleteIds);
        ResponseModel EditScandata(TblScanData tblscandata);
    }
    public class ScanDataService : IScanDataService
    {
        public List<TblScanData> getScanData()
        {
            using (DataContext context = new DataContext())
            {
                var rs = context.TblScanData.Where(p => p.DeletedOn == null).OrderByDescending(p=>p.CreatedOn).ToList();
                return rs;
            }
        }

        public ResponseModel addScanData(TblScanData tblscandata)
        {
            var res = new ResponseModel()
            {
                Status = "200",
                Message = "",
            };
            try
            {
                using (DataContext context = new DataContext())
                {
                    Guid g;
                    g = Guid.NewGuid();
                    var rs = context.TblScanData.FirstOrDefault(p => p.ScanId != tblscandata.ScanId);
                    if (rs != null)
                    {
                        var x = new TblScanData
                        {
                            ScanId = g.ToString(),
                            Uid = tblscandata.Uid,
                            CreatedOn = DateTime.UtcNow.AddHours(7),
                            Payload = tblscandata.Payload,
                            DataType = tblscandata.DataType,
                            FileName = tblscandata.FileName,
                            Status = tblscandata.Status,
                            DeletedOn = null,
                        };
                        context.TblScanData.Add(x);
                        res.Data = x;
                    }
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                res.Status = "500";
                res.Message = ex.Message;
            }

            return res;
        }
        public ResponseModel DeleteScanData(string scanid)
        {
            var res = new ResponseModel()
            {
                Status = "200",
                Message = "",
            };
            try
            {
                using (DataContext context = new DataContext())
                {
                    var rs = context.TblScanData.FirstOrDefault(o => o.ScanId == scanid);
                    if (rs != null)
                    {
                        rs.DeletedOn = DateTime.UtcNow.AddHours(7);
                        context.SaveChanges();
                        res.Data = rs;
                    }
                }

            }
            catch (Exception ex)
            {
                res.Status = "500";
                res.Message = ex.Message;
            }
            return res;
        }

        public ResponseModel DeleteArrScanData(List<string> deleteIds)
        {
            var res = new ResponseModel()
            {
                Status = "200",
                Message = "",
            };
            try
            {
                using (DataContext context = new DataContext())
                {
                    foreach (var deleteId in deleteIds)
                    {
                        var scandata = context.TblScanData.FirstOrDefault(o => o.ScanId == deleteId);
                        if (scandata != null)
                        {
                            scandata.DeletedOn = DateTime.UtcNow.AddHours(7);
                        }res.Data = deleteIds;
                    }
                    
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                res.Status = "500";
                res.Message = ex.Message;
            }
            return res;
        }
        public ResponseModel EditScandata(TblScanData tblscandata)
        {
            var res = new ResponseModel()
            {
                Status = "200",
                Message = "",
            };
            try
            {
                using (DataContext context = new DataContext())
                {
                    var oldscandata = (from u in context.TblScanData where u.ScanId == tblscandata.ScanId select u).FirstOrDefault();
                    if (oldscandata != null)
                    {
                        oldscandata.Uid = tblscandata.Uid;
                        oldscandata.CreatedOn = DateTime.UtcNow.AddHours(7);
                        oldscandata.Payload = tblscandata.Payload;
                        oldscandata.DataType = tblscandata.DataType;
                        oldscandata.FileName = tblscandata.FileName;
                        oldscandata.Status = tblscandata.Status;
                        oldscandata.DeletedOn = null;
                        context.SaveChanges();
                        res.Data = oldscandata;
                    }
                }
            }
            catch (Exception ex)
            {
                res.Status = "500";
                res.Message = ex.Message;
            }
            return res;
        }

    }
}