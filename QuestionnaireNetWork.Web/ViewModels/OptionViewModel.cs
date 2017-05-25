using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuestionnaireNetWork.Web.ViewModels
{
    public partial class OptionViewModel
    {
        public int OptionId { get; set; }
        public int ChoiceId { get; set; }
        public string OptionContent { get; set; }
    }
}
