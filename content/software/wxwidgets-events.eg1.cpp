wxBEGIN_EVENT_TABLE(MyFrame, wxFrame)
  EVT_MENU(wxID_EXIT, MyFrame::OnExit)
  EVT_MENU(DO_TEST, MyFrame::DoTest)
  EVT_SIZE(MyFrame::OnSize)
  EVT_BUTTON(BUTTON1, MyFrame::OnButton1)
wxEND_EVENT_TABLE()