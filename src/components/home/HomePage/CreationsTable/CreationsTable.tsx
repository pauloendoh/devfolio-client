import { buildCreationDto } from "@/types/domain/creation/CreationDto";
import DTO from "@/types/utils/DTO";
import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { Creation } from "@prisma/client";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { MdAdd } from "react-icons/md";
import ReactTimeago from "react-timeago";
import CreationDialog from "../CreationDialog/CreationDialog";

interface Props {
  creations: DTO<Creation>[];
}

const CreationsTable = ({ creations }: Props) => {
  const router = useRouter();

  const techs = router.query.techs;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogInitialValue, setDialogInitialValue] = useState(
    buildCreationDto()
  );

  const [sort, setSort] = useState<{
    by: keyof DTO<Creation>;
    order: "desc" | "asc";
  }>({
    by: "date",
    order: "desc",
  });

  const sortedCreations = useMemo(() => {
    if (sort.by === "complexity") {
      if (sort.order === "desc")
        return creations.sort((a, b) => {
          if (a.complexity === null) return 1;
          if (b.complexity === null) return -1;
          return a.complexity > b.complexity ? -1 : 1;
        });

      return creations.sort((a, b) => {
        if (a.complexity === null) return 1;
        if (b.complexity === null) return -1;
        return a.complexity < b.complexity ? -1 : 1;
      });
    }

    if (sort.by === "date") {
      if (sort.order === "desc")
        return creations.sort((a, b) => {
          if (a.date === null) return 1;
          if (b.date === null) return -1;
          return b.date?.localeCompare(a.date);
        });

      return creations.sort((a, b) => {
        if (a.date === null) return 1;
        if (b.date === null) return -1;
        return a.date?.localeCompare(b.date);
      });
    }

    return creations;
  }, [creations, sort]);

  const sortedAndFilteredCreations = useMemo(() => {
    if (techs) {
      if (typeof techs === "string")
        return sortedCreations.filter((creation) =>
          creation.technologies.includes(techs)
        );
    }
    return sortedCreations;
  }, [sortedCreations, techs]);

  const handleClickSort = (attribute: keyof DTO<Creation>) => {
    if (sort.by === attribute) {
      setSort({
        by: attribute,
        order: sort.order === "asc" ? "desc" : "asc",
      });
    } else setSort({ by: attribute, order: "desc" });
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Creation</TableCell>

              <TableCell
                align="center"
                sortDirection={sort.by === "complexity" ? sort.order : false}
              >
                <TableSortLabel
                  active={sort.by === "complexity"}
                  direction={sort.by === "complexity" ? sort.order : "desc"}
                  onClick={() => handleClickSort("complexity")}
                >
                  Complexity
                </TableSortLabel>
              </TableCell>

              <TableCell
                align="left"
                sortDirection={sort.by === "date" ? sort.order : false}
              >
                <TableSortLabel
                  active={sort.by === "date"}
                  direction={sort.by === "date" ? sort.order : "desc"}
                  onClick={() => handleClickSort("date")}
                >
                  Developed
                </TableSortLabel>
              </TableCell>

              <TableCell>Techs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAndFilteredCreations.map((creation) => (
              <TableRow
                key={creation.id}
                hover
                onClick={() => {
                  setDialogInitialValue(buildCreationDto(creation));

                  setDialogOpen(true);
                }}
                sx={{
                  cursor: "pointer",
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {creation.title}
                </TableCell>
                <TableCell align="center">{creation.complexity}</TableCell>
                <TableCell>
                  <ReactTimeago date={creation.date} live={false} />
                </TableCell>
                <TableCell>
                  {creation.technologies.map((tech) => (
                    <Chip key={tech} label={tech} />
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <Button
                onClick={() => {
                  setDialogInitialValue(buildCreationDto());
                  setDialogOpen(true);
                }}
                startIcon={<MdAdd />}
                variant="contained"
                sx={{ width: 140, mb: 2, ml: 2 }}
              >
                Add Creation
              </Button>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <CreationDialog
        initialValue={dialogInitialValue}
        onClose={() => setDialogOpen(false)}
        open={dialogOpen}
      />
    </>
  );
};

export default CreationsTable;
