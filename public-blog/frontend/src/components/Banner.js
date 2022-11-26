import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: "Blogs on Music",
    imgPath:
      "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    label: "Blogs on Computer",
    imgPath:
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    label: "Food Blogs",
    imgPath:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    label: "Blogs on Sport",
    imgPath:
      "https://images.pexels.com/photos/165939/pexels-photo-165939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },

  {
    label: "Daily Life Blogs",
    imgPath:
      "https://images.pexels.com/photos/618116/pexels-photo-618116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    label: "Current Affairs",
    imgPath:
      "https://images.pexels.com/photos/1464203/pexels-photo-1464203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    label: "Work Blogs",
    imgPath:
      "https://images.pexels.com/photos/4427642/pexels-photo-4427642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    label: "Blogs on Festival",
    imgPath:
      "https://images.pexels.com/photos/3447333/pexels-photo-3447333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    label: "Blogs on Films",
    imgPath:
      "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },

  {
    label: "Blogs on Culture",
    imgPath:
      "https://images.pexels.com/photos/1707402/pexels-photo-1707402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },

  {
    label: "Street Food Blogs",
    imgPath:
  "https://images.pexels.com/photos/618491/pexels-photo-618491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },

  {
    label: "Blogs on Fashion",
    imgPath:
  "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

const styles = (theme) => ({
  root: {
    maxWidth: "300vh",
    flexGrow: 1,
    marginTop:10,
    marginBottom:0,
    display: "flex",
    alignItems: "center",
  },
  header: {
    
    height: 50,
    paddingRight: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
    marginLeft: 20,
    

  },
  img: {
    height: 500,
    display: "block",
    maxWidth: "200vh",
    overflow: "hidden",
    width: "100%",
   
  }
});

class SwipeableTextMobileStepper extends React.Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState((prevState) => ({
      activeStep: prevState.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState((prevState) => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  handleStepChange = (activeStep) => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = tutorialSteps.length;
    return (
      <div className={classes.root}>
          <div>
    <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  className={classes.img}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button
              size="small"
              onClick={this.handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={this.handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              
            </Button>
          }
        />
    </div>
        { <Paper square elevation={0} className={classes.header}>
          <Typography
          style={{ fontWeight: 600 }}>{tutorialSteps[activeStep].label}</Typography>
        </Paper> }
      </div>
    );
  }
}
SwipeableTextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(
  SwipeableTextMobileStepper
);
