﻿using System;
using System.Collections.Generic;

namespace Scanx.Web.Models
{
    public partial class TblScanData
    {
        public string ScanId { get; set; }
        public int? Uid { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string Payload { get; set; }
        public string DataType { get; set; }
        public string FileName { get; set; }
        public int? Status { get; set; }
        public DateTime? DeletedOn { get; set; }
        public string StationName { get; set; }

        public virtual TblUsers U { get; set; }
    }
}
